import React, { useState } from 'react';
import './topicGet.css';

export function Topic() {
  const [topic, setTopic] = useState('');

  const handleGetTopic = () => {
    setTopic('LA Wildfires Status'); // This will later be replaced with dynamic topic fetching
  };

  return (
    <main className="container text-center my-4">
      <div id="picture" className="picture-box mx-auto">
        <img src="FreeChatLogo.webp" alt="Free Chat Logo" />
      </div>
    
      <section className="topic-section bg-info p-4 rounded shadow-sm">
        <button className="btn btn-primary mb-3" type="button" onClick={handleGetTopic}>
          Get Topic
        </button>
        <p className="topic-display">Topic: <span id="topic-text">{topic}</span></p>
        <p className="text-muted">Click the "Get Topic" button to find a current topic you can use in a chat!</p>
      </section>
    
      <section className="disclaimer bg-danger text-white p-3 rounded mt-3">
        <p>Use of this application is for non-profit, educational use only.</p>
        <p>No part of this code or program should be used outside of that definition.</p>
      </section>
    
      <div id="quote" className="quote-box bg-info text-dark mt-3 p-3 rounded">
        <p className="quote">"There is just news. There is no good or bad."</p>
        <p className="author">Oogway :D</p>
      </div>
    </main>
  );
}
