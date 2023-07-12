import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Copyright } from './Footer/Copyright';
import { useNavigate } from "react-router-dom";
import { NavBar } from './NavBar/NavBar';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const defaultTheme = createTheme();

export function HomePage() {
  
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  //Lógica para enviar al usuario al mainview si está autorizado...

  useEffect(() => {
    if (!isLoggedIn || !localStorage.getItem('token')) {
      navigate("/");
    } else {
      isLoggedIn && navigate("/mainview");
    }
  }, [isLoggedIn]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <NavBar/>
      <Container disableGutters maxWidth="sm" component="main" align="center" sx={{ pt: 8, pb: 6 }}>
        <img src="\Logo.png" alt="" />
        <br/><br/><br/>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Conecta Oferta, Demanda y Agentes Inmobiliarios, de manera segura y eficiente.
        </Typography>
        <br/><br/>
        <Button variant="contained" onClick={()=>(navigate("/register"))}>Regístrate</Button>
      </Container>
      <Container maxWidth="md" component="footer" sx={{ mt: 8, py: [3, 6] }}>
        <Divider />
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
