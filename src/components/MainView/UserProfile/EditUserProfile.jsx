import React, { useState } from 'react';
import { Box, Grid, Paper, TextField, Button, IconButton, Avatar } from '@mui/material';
import { Container } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export const EditUserProfile = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Aquí puedes realizar la lógica para enviar los datos actualizados al servidor
  };

  return (
    <Container fixed>
      <Box sx={{ display: 'flex' }}>
      <Grid item xs={6} sm={4} container spacing={1}>
      <Avatar /*TODO coger de los datos del usuario el avatar (ruta de la imagen) */
          alt="User Avatar"
          src=""
          style={{ width: '6rem', height: '6rem', marginRight: '3rem' }}
        />
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
        <ManageSearchIcon style={{ fontSize: '30px' }} />
        </IconButton>
        </Grid>  
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} style={{ padding: '2rem' }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  name="documentType"
                  label="Document Type"
                  value={formData.documentType || ''}
                  onChange={handleChange}
                  fullWidth
                  select
                  SelectProps={{ native: true }}
                >
                  <option value="DNI">DNI</option>
                  <option value="NIE">NIE</option>
                </TextField>

                <TextField
                  name="documentNumber"
                  label="Document Number"
                  value={formData.documentNumber || ''}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  name="agentRegistrationNumber"
                  label="Agent Registration Number"
                  value={formData.agentRegistrationNumber || ''}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  name="name"
                  label="Name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  name="surname"
                  label="Surname"
                  value={formData.surname || ''}
                  onChange={handleChange}
                  fullWidth
                />

                {/* Resto de campos de la columna izquierda */}
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} style={{ padding: '2rem' }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  name="mainOfficeCountry"
                  label="Main Office Country"
                  value={formData.mainOfficeCountry || ''}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  name="mainOfficeProvince"
                  label="Main Office Province"
                  value={formData.mainOfficeProvince || ''}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  name="mainOfficeZipCode"
                  label="Main Office Zip Code"
                  value={formData.mainOfficeZipCode || ''}
                  onChange={handleChange}
                  fullWidth
                />

                {/* Resto de campos de la columna derecha */}
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Guardar cambios
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};