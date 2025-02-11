import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();  // Hook for navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle both Login and Create buttons
  const handleAuth = (e, type) => {
    e.preventDefault();  // Prevent page reload
    console.log(`${type} with Username: ${username}, Password: ${password}`);

    // Navigate to MakeChat page after login or account creation
    navigate('/makechat', { state: { username } });  
  };

  return (
    <main className="container-xxl bg-danger text-center">
      <div>
        <h1>Welcome to Free Chat!! :D</h1>

        {/* Form submission handled by React */}
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

          {/* Buttons trigger the handleAuth function */}
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