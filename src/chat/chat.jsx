import React, { useState, useEffect } from 'react';
import './chat.css';
import { useLocation } from 'react-router-dom';

export function Chat() {
  const location = useLocation();
  const chatName = location.state?.chatName || 'Unknown Chat';

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sampleMessages = [
    { user: 'Alice', text: 'Anyone here watched the latest movie?' },
    { user: 'Charlie', text: 'What’s everyone up to today?' },
    { user: 'Dana', text: 'Has anyone tried that new coffee shop?' }
  ];

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await fetch('/api/chats');
        if (response.ok) {
          const data = await response.json();
          const currentChat = data.find(chat => chat.name === chatName);
          if (currentChat && currentChat.messages) {
            setMessages(currentChat.messages);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchChat();
  }, [chatName]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      setMessages((prev) => {
        const newMessages = [...prev, randomMessage];
        updateChatMetadata(newMessages);
        return newMessages;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => {
        const newMessages = [...prev, { user: 'You', text: input }];
        updateChatMetadata(newMessages);
        return newMessages;
      });
      setInput('');
    }
  };

  const updateChatMetadata = async (newMessages) => {
    const chatUpdate = { 
      name: chatName, 
      messages: newMessages, 
      comments: newMessages.length, 
      date: new Date().toLocaleDateString() 
    };
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chatUpdate),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="chat-container">
      <h1 className="chat-title">Welcome to {chatName}!</h1>
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
