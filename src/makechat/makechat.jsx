import React from 'react';
import './makechat.css';

export function MakeChat() {
  return (
    <main class="container-xxl text-center">
      <div class="users-container">
        <h3>Recent Activity:</h3>
        <div class="users">
          <span class="user-name">Recent Users</span>
          <div id="user-messages">
            <div class="event"><span class="user-event">Tim</span> started a new chat recently!</div>
            <div class="event"><span class="user-event">Ada</span> started a new chat recently!</div>
          </div>
        </div>
      </div>

      <div class="create-chat-container">
        <p class="create-chat-text">
          Type in the name of your chat, whatever you wish! It is recommended that you name it according to what you want to chat about.
        </p>
        <form method="get" action="chatExample.html">
          <div class="form-group">
            <label for="chat-name">Chat Name</label>
            <input type="text" id="chat-name" class="form-control" placeholder="No name" />
          </div>
          <button type="submit" class="btn btn-primary mt-2">Create Chat</button>
        </form>
      </div>
    </main>
  );
}