import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../HomePage/Footer/Copyright';
import React, { useState, useEffect, useContext } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";
import { ResetPassword } from './ResetPassword';
import queryString from 'query-string';
import { useParams, useLocation } from 'react-router-dom';
import { getPayload } from '../apiService/apiService';

const defaultTheme = createTheme();

export function PasswordRecovery() {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  const location = useLocation(); // Obtener la ubicación actual
  const queryParams = queryString.parse(location.search); // Parsear los parámetros de la consulta

  const [open, setOpen] = useState(false); // Estado para controlar la apertura del diálogo para cambiar la contraseña
  const [userId, setUserId] = useState(null); // Variable para almacenar el userId
  const [email, setEmail] = useState(null); // Variable para almacenar el email

  const handleResetPasswordOpen = () => {
    setOpen(true); // Abrir el diálogo de cambiar contraseña estableciendo el estado en true
  };

  const handleResetPasswordClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  useEffect(() => {
    console.log("userId obtenido delpayload: ", userId);
    console.log("email obtenido del payload: ", email);
  }, [userId, email]);

  const findUser = async () => {
    try {
      const mailtoken = queryParams.token; // Obtener el token enviado por mail de los query parameters
      const payload = await getPayload(mailtoken);
      const payloaduserId = payload.data.userId;
      const payloademail = payload.data.email;
      setUserId(payloaduserId); // Guardar el userId en el estado
      setEmail(payloademail); // Guardar el email en el estado
    } catch (error) {
      console.error('El link ya expiró, genera otro correo de recuperación de contraseña', error);
      alert('El link ya expiró, genera otro correo de recuperación de contraseña');
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
          <Typography sx={{ marginBottom: "50px" }} component="h1" variant="h5">
            ¡Estás de regreso!
          </Typography>
          <div style={{ marginBottom: "40px", display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="primary" variant="contained" onClick={handleResetPasswordOpen}>Cambiar contraseña</Button>
            {open && <ResetPassword open={open} onClose={handleResetPasswordClose} userId={userId} email={email}/>}
          </div>
          <Link justifyContent="center" onClick={() => navigate("/forgotpassword")} variant="body2">
                Volver a generar un correo de recuperación de contraseña.
              </Link>

        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
