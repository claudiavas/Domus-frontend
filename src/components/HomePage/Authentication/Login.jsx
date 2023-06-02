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
import React, { useState } from 'react';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export function Login() {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[error, setError] = useState("");
  const[isLoading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/users/login", { email, password });
      console.log("esto es response", response);
      const token = response.data.token;
      window.localStorage.setItem("token", token)
      navigate("/MainView")
    } catch (error) {
      console.log("este es el error", error)
      setTimeOut(() => {
        setError(error.response.data.result)
      }, 5000)
    }
    }
  

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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuérdame"
            />        
            <LoadingButton      
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <span>Ingresar</span>
            </LoadingButton>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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