import { Lock as LockIcon } from '@mui/icons-material';
import { Alert, Box, Button, Container, Paper, Snackbar, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import  { useContext } from 'react';

const SignIn = () => {
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/user/login/${email}/${password}`);
      if (response.ok) {
        const user = await response.json();
        setUser(user);
        localStorage.setItem('email', user.email); // Store email in localStorage
        localStorage.setItem('isLoggedIn', 'true'); // Store login status
        setAlert(<Alert severity="success">Sign in Successful!</Alert>);
        setOpen(true);
        setTimeout(() => {
          navigate('/'); // Navigate to Home page
        }, 2000);
      } else {
        setAlert(<Alert severity="error">Invalid credentials, please try again.</Alert>);
      }
    } catch (error) {
      setAlert(<Alert severity="error">Error signing in, please try again later.</Alert>);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setAlert(null);
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderRadius="8px"
        padding="20px"
        marginTop="50px"
        bgcolor="#f9f9f9"
      >
        <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            component="form"
            onSubmit={handleSignIn}
          >
            <LockIcon fontSize="large" color="primary" />
            <Typography variant="h4" gutterBottom>
              Sign In
            </Typography>
            {alert && <Box sx={{ mb: 2 }}>{alert}</Box>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to="/register"
              fullWidth
              variant="text"
              color="primary"
              style={{ marginTop: '10px' }}
            >
              Don't have an account? Sign Up
            </Button>
          </Box>
        </Paper>
      </Box>
      <Snackbar open={open || alert} autoHideDuration={6000} onClose={handleClose}>
        {alert && (
          <Alert onClose={handleClose} severity={alert.props.severity}>
            {alert.props.children}
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
};

export default SignIn;
