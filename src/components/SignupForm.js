// SignupForm.js
import React, { useState } from 'react';

const SignupForm = ({ switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false); 

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate signup form fields
    if (username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || email.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Proceed with signup logic
    try{
      console.log("Signup form submitted with:", { username, password, email });

      const response = await fetch("http://localhost:5001/create-user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,password,email})
      });

      if (!response.ok){
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }

      console.log('User registered successfully!');
      setRegistrationSuccess(true);
      
    }catch (error){
      console.error('Registration Failed:', error.message);
    }

  };

  return (
    <div>
      {registrationSuccess && <p>User Created Succesfully, return to login.</p>}
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
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
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <label htmlFor="confirmPassword" style={{ marginRight: '10px' }}>Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: '250px', padding: '2px' }}
          />
        </div>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <label htmlFor="email" style={{ marginRight: '10px' }}>Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '250px', padding: '2px' }}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <button onClick={switchToLogin}>Switch to Login</button>
    </div>
  );
};

export default SignupForm;
