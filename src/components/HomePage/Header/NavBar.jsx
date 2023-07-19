import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMenuInicio = location.pathname === '/';

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!isMenuInicio && (
          <Button onClick={() => navigate("/")} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Inicio
          </Button>
        )}
        <Button onClick={() => navigate("/login")} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
