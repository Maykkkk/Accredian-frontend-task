// src/components/SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3002/api/signup', {
        username,
        email,
        password,
        confirmPassword,
      });
      console.log(response.data); // Handle successful signup

      // Redirect to the login page after successful signup
      navigate('/Login');
    } catch (error) {
      console.error('Error signing up:', error.response.data.message);
      // Handle signup error
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSignUp} fullWidth>
          Sign Up
        </Button>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUp;
