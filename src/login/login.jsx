import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e, type) => {
    e.preventDefault();
    console.log(`${type} with Username: ${username}, Password: ${password}`);
    
    if (username) {
      localStorage.setItem('user', username);
      setUser(username);
      navigate('/makechat');
    }
  };

  return (
    <main className="container-xxl bg-danger text-center">
      <div>
        <h1>Welcome to Free Chat!! :D</h1>
        <form>
          <div className="input-group-container">
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input 
                className="form-control" 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <span className="input-group-text">🔒</span>
              <input 
                className="form-control" 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>
          <button 
            type="button" 
            className="btn btn-success mt-2 mx-1" 
            onClick={(e) => handleAuth(e, 'Login')}
          >
            Login
          </button>
          <button 
            type="button" 
            className="btn btn-info mt-2 mx-1" 
            onClick={(e) => handleAuth(e, 'Create')}
          >
            Create
          </button>
        </form>
      </div>
    </main>
  );
}
