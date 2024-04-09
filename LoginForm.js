// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ switchToSignup,setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate username and password
    if (username.trim() === '' || password.trim() === '') {
      alert('Please enter username and password');
      return;
    }

    // Proceed with login logic
    try {
      const response = await fetch("http://localhost:5001/auth-user", {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Authentification succesful');
        localStorage.setItem("isLoggedIn", "true");
        setIsAuthenticated(true);
        navigate('/products')

      } else {
        console.error('Authentification Failed:', data.message);
        localStorage.removeItem("isLoggedIn");
        setIsAuthenticated(false);
    } 
    }catch (error){
      localStorage.removeItem("isLoggedIn");
      setIsAuthenticated(false);
      console.error("Authentification Failed:", error.message);
    }
    // API call to authenticate the user

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <label htmlFor="username" style={{ marginRight: '10px' }}>Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '250px', padding: '2px' }}
          />
        </div>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <label htmlFor="password" style={{ marginRight: '10px' }}>Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '250px', padding: '2px' }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={switchToSignup}>Switch to Signup</button>
    </div>
  );
};

export default LoginForm;
