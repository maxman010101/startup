import React, { useState, useEffect } from 'react';
import './activechats.css';
import { NavLink, Outlet } from 'react-router-dom';

export function ActiveChats() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
    setChats(storedChats);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedChats = JSON.parse(localStorage.getItem('chats')) || [];
      setChats(updatedChats);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <main className="container-fluid bg-warning text-center p-4">
        <section className="bg-dark text-white p-3 rounded mb-4">
          <p>Click on a chat to enter:</p>
          <nav>
            <menu className="d-flex justify-content-center gap-3">
              {chats.map((chat, index) => (
                <li key={index}>
                  <NavLink className="btn btn-warning" to="chat" state={{ chatName: chat.name }}>
                    {index + 1}
                  </NavLink>
                </li>
              ))}
            </menu>
          </nav>
        </section>
    
        <table className="table table-info table-striped-columns">
          <thead className="table-danger">
            <tr>
              <th>#</th>
              <th>Chat Name</th>
              <th>Comments</th>
              <th>Date of Last Update</th>
            </tr>
          </thead>
          <tbody>
            {chats.map((chat, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{chat.name}</td>
                <td>{chat.comments}</td>
                <td>{chat.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Outlet />
    </div>
  );
}