import React from 'react';


export function Login() {
  return (
    <main class="container-xxl bg-danger text-center">
      <div>
        <h1>Welcome to Free Chat!! :D</h1>
        <form method="get" action="play.html">
          <div class="input-group-container">
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input class="form-control" type="text" placeholder="Username" />
            </div>
            <div class="input-group">
              <span class="input-group-text">🔒</span>
              <input class="form-control" type="password" placeholder="Password" />
            </div>
          </div>
          <button type="submit" class="btn btn-success">Login</button>
          <button type="submit" class="btn btn-info">Create</button>
        </form>
      </div>
    </main>
  );
}