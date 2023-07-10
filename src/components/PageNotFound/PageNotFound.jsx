import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

export function PageNotFound() {

  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img
              src="/pageNotFound.jpg"
              alt=""
              width={400}
              height={250}
            />
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
              Oops...la página que estás buscando no existe
            </Typography>
            <br/>
            <Button variant="contained" onClick={() => navigate("/")}>Regresar al Inicio</Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
