import React, { useState, useEffect } from 'react';
import './chat.css';

export function Chat() {
  const [messages, setMessages] = useState([
    { user: 'Joe', text: 'How about that weather?!' },
    { user: 'Bob', text: "It's pretty cold, alright!" }
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => [...prev, { user: 'System', text: 'This is a placeholder message.' }]);
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