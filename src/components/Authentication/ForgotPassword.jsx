import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Avatar, TextField, Link, Grid, Snackbar } from '@mui/material';
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
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

    const sendEmail = async (email, name) => {
      try {
        console.log('ejecutandosendEmail');
        const body = {
          email: email,
          name: name
        };
        const response = await sendPasswordResetEmail(body);
        console.log('Correo de recuperación de contraseña enviado correctamente');
      } catch (error) {
        console.error('Error al enviar el correo de recuperación de contraseña:', error);
        throw new Error('Ocurrió un error al enviar el correo de recuperación de contraseña');
      }
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!email) {
        setError('Por favor ingresa tu correo electrónico');
        setSnackbarOpen(true);
        return;
      }

      if (!email.includes('@') || !email.includes('.') || email.length > 320 || email.length < 6) {
        setError('Por favor ingresa un correo electrónico válido');
        setSnackbarOpen(true);
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
          setError('El correo electrónico no se encuentra en nuestra base de datos, por favor revísalo o regístrate.');
          setSnackbarOpen(true);
        }
      
    } catch (error) {
      console.error('Error:', error);
      setError('El correo electrónico no se encuentra en nuestra base de datos, por favor revísalo o regístrate.');
      setSnackbarOpen(true);
    }
  };
  
useEffect(() => {
  error && setSnackbarOpen(true);
}, [error]);

useEffect(() => {
  snackbarOpen === false && setError('')
}, [snackbarOpen]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={error}
      />
    </ThemeProvider>
  );
}
