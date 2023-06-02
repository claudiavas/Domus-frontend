import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../Footer/Copyright';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';


const defaultTheme = createTheme();

export function Register() {
  
  const navigate = useNavigate()
  const[error, setError] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, name, surname } = event.target.elements;
    
    
    try {
      const response = await axios.post("http://localhost:8000/users/register", {
        email: email.value,
        password: password.value,
        name: name.value,
        surname: surname.value
      });
      
      const { token, user } = response.data;
      // Guardar el token y los datos del usuario en el estado o en el almacenamiento local
      window.localStorage.setItem("token", token)
      navigate("/MainView")
    } catch (error) {
      setError(error.response.data.error.result);
      console.log("El error es ", error )
      /*setTimeout(() => {
        setError(error.response.data.result);
        console.log("este es error", error)
      }, 5000);*/
   }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Regístrate en Domus
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="surname"
                  label="Apellidos"
                  name="surname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Quiero recibir inspiración, promociones de marketing y actualizaciones via email."
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <span>Registrarme</span>
            </LoadingButton>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => navigate("/login")} variant="body2">
                  ¿Ya tienes una cuenta? Ingresa aquí
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}