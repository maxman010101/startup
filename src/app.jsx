import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './login/login';
import { MakeChat } from './makechat/makechat';
import { ActiveChats } from './activechats/activechats';
import { Topic } from './topic/topic';
import { Chat } from './chat/chat';

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <BrowserRouter>
            <div className="body bg-success text-dark">
                <header className="container-fluid d-flex justify-content-between align-items-center p-3 bg-dark text-white">
                    <nav className="navbar fixed-top navbar-dark bg-success px-3">
                        <NavLink className="navbar-brand text-warning fs-3" to="/">Free Chat</NavLink>
                        <menu className="navbar-nav d-flex flex-row ms-auto">
                            {!user ? (
                                <li className="nav-item"><NavLink className="nav-link" to="/">Login</NavLink></li>
                            ) : (
                                <>
                                    <li className="nav-item"><NavLink className="nav-link" to="/makechat">Make New Chat</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-link" to="/activechats">Active Chats</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-link" to="/topic">Get Chat Topic</NavLink></li>
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </>
                            )}
                        </menu>
                        <h1 className="logged-in-text m-0 flex-grow-1 text-end">Currently Logged in as: <span>{user || 'Guest'}</span></h1>
                    </nav>
                </header>
                
                <main>
                    <Routes>
                        <Route path='/' element={<Login setUser={setUser} />} exact />
                        <Route path='/makechat' element={user ? <MakeChat /> : <Navigate to="/" />} />
                        <Route path='/activechats' element={user ? <ActiveChats /> : <Navigate to="/" />} />
                        <Route path='/topic' element={user ? <Topic /> : <Navigate to="/" />} />
                        <Route path='/activechats/chat' element={user ? <Chat /> : <Navigate to="/" />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </main>
                
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
