import React, { useState, useEffect } from 'react';
import './chat.css';
import { useLocation } from 'react-router-dom';

export function Chat() {
  const location = useLocation();
  const chatName = location.state?.chatName || 'Unknown Chat';

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [senderName, setSenderName] = useState('');
  const [ws, setWs] = useState(null);

  // Load existing messages for the chat from the backend
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
        console.error('Error fetching chat:', err);
      }
    };
    fetchChat();
  }, [chatName]);

  // Establish WebSocket connection for real-time messaging
  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    // Assumes your WebSocket endpoint is at /ws
    const socket = new WebSocket(`${protocol}://${window.location.hostname}:${window.location.port}/ws`);
    
    socket.onopen = () => {
      console.log('WebSocket connected for chat');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Only handle messages of type 'chatMessage' for this chat
        if (data.type === 'chatMessage' && data.chatName === chatName) {
          setMessages(prev => [...prev, { user: data.user, text: data.text }]);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [chatName]);

  // Update the chat metadata (persist messages) on the backend
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
      console.error('Error updating chat metadata:', err);
    }
  };

  // Handle sending a new chat message
  const handleSendMessage = async () => {
    if (input.trim() && senderName.trim()) {
      const newMsg = { user: senderName, text: input };
      const updatedMessages = [...messages, newMsg];
      setMessages(updatedMessages);

      // Send the new message via WebSocket so that other clients receive it
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'chatMessage',
          chatName,
          user: senderName,
          text: input,
        }));
      }

      // Persist the updated chat to the backend
      await updateChatMetadata(updatedMessages);
      setInput('');
    }
  };

  return (
    <main className="chat-container">
      <h1 className="chat-title">
        Welcome to {chatName}! Please re-enter the chat to see updates!
      </h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === senderName ? 'sent' : 'received'}`}>
            <p><strong>{msg.user}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input 
          type="text" 
          placeholder="Enter your display name..." 
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
        />
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