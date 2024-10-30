import React, { useState } from 'react';
import { login } from './API';
import { useNavigate, Navigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToSignup, setRedirectToSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.access); // Save token
      navigate('/app'); // Redirect to app page after login
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleNavigateToSignup = () => {
    setRedirectToSignup(true); // Set redirect state to true
  };

  if (redirectToSignup) {
    return <Navigate to="/signup" />; // Redirect to Signup page
  }

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <div>
        Don't have an account? 
        <span 
          onClick={handleNavigateToSignup} 
          style={{ marginLeft: '5px', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
          Sign up
        </span>
      </div>
    </div>
  );
};

export default Login;

