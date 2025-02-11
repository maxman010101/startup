import React from 'react';
import './chat.css';

export function Chat() {
  return (
    <main className="chat-container">
      <h1 className="chat-title">Welcome to the Chat!</h1>
    
      
      <div className="chat-box">
        <div className="message received">
          <p><strong>Joe:</strong> How about that weather?!</p>
        </div>
        <div className="message sent">
          <p><strong>Bob:</strong> It's pretty cold, alright!</p>
        </div>
      </div>
    
      <div className="message-input">
        <input type="text" placeholder="Write your message..." />
        <button type="submit">Chat</button>
      </div>
    </main>
  );
}