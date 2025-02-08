import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return(
    <div className="bg-success text-dark">
   
        <header className="container-fluid d-flex justify-content-between align-items-center p-3 bg-dark text-white">
      
    
            <nav className="navbar fixed-top navbar-dark bg-success px-3">
                <a className="navbar-brand text-warning fs-3" href="#">Free Chat</a>
                <menu className="navbar-nav d-flex flex-row ms-auto">
                <li className="nav-item"><a className="nav-link active" href="index.html">Login</a></li>
                <li className="nav-item"><a className="nav-link" href="play.html">Make New Chat</a></li>
                <li className="nav-item"><a className="nav-link" href="scores.html">Active Chats</a></li>
                <li className="nav-item"><a className="nav-link" href="about.html">Get Chat Topic</a></li>
                </menu>
            </nav>
        </header>
     
    

        <main>App components go here</main>

        <footer className="bg-dark text-info">
            <div className="container-fluid">
                <span className="text-reset">Max Whitney</span>
                <a href="https://github.com/maxman010101/startup.git">GitHub</a>
            </div>
      
        </footer>
    </div>
    );
}