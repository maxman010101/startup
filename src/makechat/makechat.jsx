import React, { useState, useEffect } from 'react';
import './makechat.css';
import { useNavigate } from 'react-router-dom';

export function MakeChat() {
  const navigate = useNavigate();
  const [chatName, setChatName] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => [...prev, `New message from Chat ${prev.length + 1}`]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateChat = (e) => {
    e.preventDefault();
    const existingChats = JSON.parse(localStorage.getItem('chats')) || [];
    const newChats = [...existingChats, { name: chatName, comments: 0, date: new Date().toLocaleDateString() }];
    localStorage.setItem('chats', JSON.stringify(newChats));
    navigate('/activechats');
  };

  return (
    <main className="container-xxl text-center">
      <div className="notifications">
        <h3>Notifications:</h3>
        <ul>
          {notifications.slice(-5).map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
      <div className="create-chat-container">
        <p>Type in the name of your chat:</p>
        <form onSubmit={handleCreateChat}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Chat Name" 
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mt-2">Create Chat</button>
        </form>
      </div>
    </main>
  );
}