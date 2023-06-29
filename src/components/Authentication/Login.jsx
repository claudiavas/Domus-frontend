import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../HomePage/Footer/Copyright';
import React, { useState, useContext } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../Contexts/AuthContext';
import { login } from '../apiService/apiService';

const defaultTheme = createTheme();

export function Login() {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setLoginState } = useContext(AuthContext);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    setLoading(true);

    try {
      const response = await login({
        email: email.value,
        password: password.value
      });
      console.log("esto es response", response);
      const token = response.token;
      window.localStorage.setItem("token", token);
      navigate("/MainView");
    } catch (error) {
      console.log("este es el error", error);
      setError(error.response.data.error.result);
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
        setLoading(false);
      }, 5000);
    }
    setLoginState(true);
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
              Ingresa a Domus
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <LoadingButton 
                loading={isLoading && !isError}  
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <span>Ingresar</span>
              </LoadingButton>
              {error && <p style={{ color: 'red', align: "center"}}>{error}</p>}
              <Grid container>
                <Grid item xs>
                  {/* TODO: Pendiente esta funcionalidad */}
                  {/* <Link onClick={() => navigate("/forgotpassword")} variant="body2">
                    ¿Olvidaste tu password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link onClick={() => navigate("/register")} variant="body2">
                    {"¿No tienes una cuenta? Regístrate"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }}/>
        </Container>
      </ThemeProvider>
  );
}
