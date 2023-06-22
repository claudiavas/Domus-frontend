import React, { useState } from 'react';
import { Grid, Paper, TextField, Button } from '@mui/material';

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
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper elevation={2} sx={{ padding: '1rem' }}>
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

            {/* Resto de campos de la columna izquierda */}
          </form>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={2} sx={{ padding: '1rem' }}>
          <form onSubmit={handleSubmit}>
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
  );
};








