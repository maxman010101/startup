import React, { useState } from 'react';
import './makechat.css';
import { useNavigate } from 'react-router-dom';

export function MakeChat() {
  const navigate = useNavigate();  // React Router navigation hook
  const [chatName, setChatName] = useState('');  // Store the chat name input

  const handleCreateChat = (e) => {
    e.preventDefault();  // Prevent page reload on form submit
    // Optionally pass the chat name as state or query params if needed
    navigate('/activechats/chat', { state: { chatName } });  // Navigate to chat page
  };

  return (
    <main className="container-xxl text-center">
      <div className="users-container">
        <h3>Recent Activity:</h3>
        <div className="users">
          <span className="user-name">Recent Users</span>
          <div id="user-messages">
            <div className="event"><span className="user-event">Tim</span> started a new chat recently!</div>
            <div className="event"><span className="user-event">Ada</span> started a new chat recently!</div>
          </div>
        </div>
      </div>

      <div className="create-chat-container">
        <p className="create-chat-text">
          Type in the name of your chat, whatever you wish! It is recommended that you name it according to what you want to chat about.
        </p>

        {/* Handle form with React instead of traditional submission */}
        <form onSubmit={handleCreateChat}>
          <div className="form-group">
            <label htmlFor="chat-name">Chat Name</label>
            <input 
              type="text" 
              id="chat-name" 
              className="form-control" 
              placeholder="No name" 
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}  // Update state with input
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">Create Chat</button>
        </form>
      </div>
    </main>
  );
}