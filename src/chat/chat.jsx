import React, { useState, useEffect } from 'react';
import './chat.css';

export function Chat() {
  const [messages, setMessages] = useState([
    { user: 'Joe', text: 'How about that weather?!' },
    { user: 'Bob', text: "It's pretty cold, alright!" }
  ]);
  const [input, setInput] = useState('');

  const sampleMessages = [
    { user: 'Alice', text: 'Anyone here watched the latest movie?' },
    { user: 'Charlie', text: 'What’s everyone up to today?' },
    { user: 'Dana', text: 'Has anyone tried that new coffee shop?' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      setMessages((prev) => [...prev, randomMessage]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { user: 'You', text: input }]);
      setInput('');
    }
  };

  return (
    <main className="chat-container">
      <h1 className="chat-title">Welcome to the Chat!</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === 'You' ? 'sent' : 'received'}`}>
            <p><strong>{msg.user}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input 
          type="text" 
          placeholder="Write your message..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="button" onClick={handleSendMessage}>Chat</button>
      </div>
    </main>
  );
}
