import React, { useState, useEffect } from 'react';
import './makechat.css';
import { useNavigate } from 'react-router-dom';

export function MakeChat() {
  const navigate = useNavigate();
  const [chatName, setChatName] = useState('');
  const [notifications, setNotifications] = useState([]);
  //const userNames = ['Joe', 'Alice', 'Bob', 'Charlie', 'Dana'];
  //const chatNames = ['Favorite Movies', 'Best Restaurants', 'Tech Talk', 'Gaming Chat', 'Daily News'];

  // Establish WebSocket connection to receive real notifications
  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const ws = new WebSocket(`${protocol}://${window.location.hostname}:${window.location.port}/ws`);
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'chatCreated') {
          // Append the notification and keep only the last 5 messages
          setNotifications(prev => [...prev, `${data.username} made a new chat called '${data.chatName}'`].slice(-5));
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleCreateChat = async (e) => {
    e.preventDefault();
    const newChat = { 
      name: chatName, 
      comments: 0, 
      date: new Date().toLocaleDateString(), 
      messages: [] 
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChat),
      });
      if (response.ok) {
        navigate('/activechats');
      } else {
        console.error('Failed to create chat');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="container-xxl text-center">
      <div className="notifications">
        <h3>Notifications:</h3>
        <ul>
          {notifications.map((note, index) => (
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