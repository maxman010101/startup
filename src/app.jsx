import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { MakeChat } from './makechat/makechat';
import { ActiveChats } from './activechats/activechats';
import { Topic } from './topic/topic';
import { Chat } from './chat/chat';

export default function App() {
    return(
    <BrowserRouter>
        <div className="bg-success text-dark">
    
            <header className="container-fluid d-flex justify-content-between align-items-center p-3 bg-dark text-white">
        
        
                <nav className="navbar fixed-top navbar-dark bg-success px-3">
                    <NavLink className="navbar-brand text-warning fs-3" to="#">Free Chat</NavLink>
                    <menu className="navbar-nav d-flex flex-row ms-auto">
                    <li className="nav-item"><NavLink className="nav-link" to="">Login</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="makechat">Make New Chat</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="activechats">Active Chats</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="topic">Get Chat Topic</NavLink></li>
                    </menu>
                    <h1 class="logged-in-text m-0 flex-grow-1 text-end">Currently Logged in as: <span id="username">username</span></h1>
                </nav>
            </header>
        
        

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/makechat' element={<MakeChat />} />
                <Route path='/activechats' element={<ActiveChats />} />
                <Route path='/topic' element={<Topic />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="bg-dark text-info">
                <div className="container-fluid">
                    <span className="text-reset">Max Whitney</span>
                    <NavLink to="https://github.com/maxman010101/startup.git">GitHub</NavLink>
                </div>
        
            </footer>
        </div>
    </BrowserRouter>
    );
}
function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }