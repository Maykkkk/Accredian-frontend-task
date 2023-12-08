// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use navigate hook for redirection

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3002/api/login', {
        username,
        password,
      });
      console.log(response.data); // Handle successful login

      // Redirect to home page after successful login
      navigate('/Home');
    } catch (error) {
      console.error('Error logging in:', error.response.data.message);
      // Handle login error
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username or Email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
          Login
        </Button>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
