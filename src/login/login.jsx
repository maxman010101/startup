import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (e, type) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Both username and password are required.');
      return;
    }
    setError('');
    const endpoint = type === 'Login' ? '/api/auth/login' : '/api/auth/create';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.msg || 'Authentication failed');
        return;
      }
      const data = await response.json();
      setUser(data.username);
      navigate('/makechat');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <main className="container-xxl bg-danger text-center">
      <div>
        <h1>Welcome to Free Chat!! :D</h1>
        {error && <p className="text-warning">{error}</p>}
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