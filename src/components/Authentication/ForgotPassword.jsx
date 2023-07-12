import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Avatar, TextField, Link, Grid, Snackbar, Alert } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { findUserByEmail } from '../apiService/apiService';
import { sendPasswordResetEmail } from '../apiService/apiService';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  

    const sendEmail = async (email, name) => {
      try {
        const body = {
          email: email,
          name: name
        };
        const response = await sendPasswordResetEmail(body);
        setSuccessSnackbarOpen(true);
        setSuccessMessage('Correo de recuperación de contraseña enviado correctamente');
      } catch (error) {
        console.error('Error al enviar el correo de recuperación de contraseña:', error);
        setErrorMessage('Ocurrió un error al enviar el correo de recuperación de contraseña');
      }
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!email) {
        setErrorMessage('Por favor ingresa tu correo electrónico');
        setErrorSnackbarOpen(true);
        return;
      }

      if (!email.includes('@') || !email.includes('.') || email.length > 320 || email.length < 6) {
        setErrorMessage('Por favor ingresa un correo electrónico válido');
        setErrorSnackbarOpen(true);
        return;
      }



      const response = await findUserByEmail(email);
      console.log(response.length);
        if (response && response.length > 0) {
          const user = response[0];
          const name = user.name;
          const surname = user.surname;
          sendEmail(email, name, surname);
        } else {
          setErrorMessage('El correo electrónico no se encuentra en nuestra base de datos, por favor revísalo o regístrate.');
          setErrorSnackbarOpen(true);
        }
      
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('El correo electrónico no se encuentra en nuestra base de datos, por favor revísalo o regístrate.');
      setErrorSnackbarOpen(true);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography align="center" component="h1" variant="h5">
            Te enviaremos un correo para recuperar tu contraseña
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LoadingButton
              loading={sent}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <span>Enviar Correo</span>
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link variant="body2" onClick={() => navigate('/register')}>
                  Quiero regístrarme
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={() => navigate('/login')}>
                  Regresar al login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        open={errorSnackbarOpen} 
        autoHideDuration={5000} 
        onClose={() => setErrorSnackbarOpen(false)} 
        >
        <Alert 
          elevation={6} 
          variant="filled" 
          severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        open={successSnackbarOpen} 
        autoHideDuration={5000} 
        onClose={() => setSuccessSnackbarOpen(false)} 
        >
        <Alert 
          elevation={6} 
          variant="filled"
          severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
