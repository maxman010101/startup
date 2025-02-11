import React from 'react';
import './topicGet.css';

export function Topic() {
  return (
    <main class="container text-center my-4">
      <div id="picture" class="picture-box mx-auto">
        <img src="FreeChatLogo.webp" alt="Free Chat Logo" />
      </div>
    
      <section class="topic-section bg-info p-4 rounded shadow-sm">
        <button class="btn btn-primary mb-3" type="submit">Get Topic</button>
        <p class="topic-display">Topic: <span id="topic-text">LA Wildfires Status</span></p>
        <p class="text-muted">Click the "Get Topic" button to find a current topic you can use in a chat!</p>
      </section>
    
      <section class="disclaimer bg-danger text-white p-3 rounded mt-3">
        <p>Use of this application is for non-profit, educational use only.</p>
        <p>No part of this code or program should be used outside of that definition.</p>
      </section>
    
      <div id="quote" class="quote-box bg-info text-dark mt-3 p-3 rounded">
        <p class="quote">"There is just news. There is no good or bad."</p>
        <p class="author">Oogway :D</p>
      </div>
    </main>
  );
}