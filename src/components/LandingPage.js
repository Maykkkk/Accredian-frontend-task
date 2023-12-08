// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const LandingPage = () => {
  return (
    <Container component="main" maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
      <Typography component="h1" variant="h2" gutterBottom>
        Welcome to Our App!
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button component={Link} to="/signup" variant="contained" color="primary" sx={{ mr: 2 }}>
          Sign Up
        </Button>
        <Button component={Link} to="/login" variant="contained" color="primary">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
