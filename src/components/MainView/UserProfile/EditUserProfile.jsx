import React, { useState } from 'react';
import { Box, Grid, Paper, TextField, Button, IconButton, Avatar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Container } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Dining } from '@mui/icons-material';

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

    // HEADINGS

    <div style={{ margin: '0rem 3rem 3rem 3rem' }}>
      <h1 style={{ marginTop: 0, background: '#1976d2', color: 'white', padding: '0.1rem' }}>Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        {/* Avatar + search icon  */}
        <Container fixed>
          {/*  <Box sx={{ display: 'flex' }}>*/}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Avatar
              style={{ marginBottom: '6px', width: '100px', height: '100px' }}
              alt="User Avatar"
              src="/profile.jpg"
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
            />
            <div style={{ display: 'grid', gap: '1px', justifyItems: 'left' }}>
              <label htmlFor="contained-button-file">
                <Button
                  style={{ marginTop: '10px' }}
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  Upload
                </Button>
              </label>
              <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file" style={{ marginTop: '16px' }}>
                {/*  <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>*/}
              </label>
            </div>
          </div>

          {/*  DOCUMENTS */}

          <Paper elevation={3} style={{ padding: '3rem', marginLeft: "1rem", marginBottom: '15rem', marginTop: '1rem' }}>
            <InputLabel id="Agent-label" htmlFor="documentType">Tipo Documento*</InputLabel>

            <Grid container spacing={1} top={"2rem"} bottom={"2rem"}>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <FormControl style={{ width: '80%' }}>
                  <Select
                    name="DocumentType"
                    label="Document Type"
                    value={formData.agent}
                    onChange={handleChange}
                    labelId="DocumentType-l"
                    fullWidth
                    SelectProps={{ native: true }}
                  >
                    <MenuItem value="DNI">DNI</MenuItem>
                    <MenuItem value="NIE">NIE</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControl style={{ width: '90%' }}>
                  <TextField
                    name="documentNumber"
                    label="Document Number"
                    value={formData.documentNumber}
                    onChange={handleChange}
                    fullWidth
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControl style={{ width: '100%' }}>
                  <TextField
                    name="agentRegistrationNumber"
                    label="Agent Registration Number"
                    value={formData.agentRegistrationNumber || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControl style={{ width: '130%' }}>
                  <TextField
                    name="AgentRegistrationComunidadAutonoma"
                    label="Agent Registration Comunidad Autonoma"
                    value={formData.agentRegistrationNumber || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                </FormControl>
              </Grid>
            </Grid> {/*Grid container*/}

            {/*  CONTACT */}
            <Grid container spacing={2} bottom={"2rem"} >
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControl style={{ width: '100%' }}>
                  <TextField
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControl style={{ width: '135%' }}>
                  <TextField
                    name="surname"
                    label="Surname"
                    value={formData.surname}
                    onChange={handleChange}
                    fullWidth
                  />
                </FormControl>
              </Grid>
            </Grid> {/*Grid container*/}

            <Grid container spacing={2} bottom={"2rem"} >
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControl style={{ width: '100%' }}>
                  <TextField
                    name="mainOfficeCountry"
                    label="Country"
                    value={formData.mainOfficeCountry || ''}
                    onChange={handleChange}
                    fullWidth
                 />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControl style={{ width: '100%' }}>
                  <TextField
                    name="mainOfficeProvince"
                    label="Province"
                    value={formData.mainOfficeProvince || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <FormControl style={{ width: '50%' }}>
                    <TextField
                      name="mainOfficeZipCode"
                      label="Zip Code"
                      value={formData.mainOfficeZipCode || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
               </Grid> {/*Grid container*/} 
              </Paper>
              </Container>
              </form>
              {/* Botón de envío */}
              <div style={{ display: "flex", justifyContent: "flex-end", height: '2rem' }}>   {/* Esto es un hack para que el botón no tape los campos de texto */}
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                  Enviar
                </Button>
              </div>             

          {/*  </Box>*/}



    </div>
  )
};