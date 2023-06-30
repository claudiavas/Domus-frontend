import React, { useState } from 'react';
import { Box, Grid, Paper, TextField, Button, IconButton, Avatar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Container } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Dining } from '@mui/icons-material';

export const EditUserProfile = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'province':
        setSelectedProvince(value);
        break;
      case 'zipCode':
        setSelectedZipCode(value);
        break;
    }

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

    <div style={{ margin: '0rem 0rem 3rem 0rem' }}>

      <h1 style={{ marginTop: 0, background: '#1976d2', color: 'white', padding: '0.1rem' }}>Editar Perfil</h1>

      {/* Avatar + search icon  */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '2rem 10rem 0rem 10rem' }}>
        {/* Avatar */}
        <div style={{ display: 'grid', gap: '1px', justifyItems: 'center', marginLeft: '14px' }}>
          <Avatar
            style={{ marginBottom: '2px', width: '80px', height: '80px' }}
            alt="User Avatar"
            src="/profile.jpg"
          />
        </div>
        {/* Upload button */}
        <div style={{ display: 'grid', gap: '1px', justifyItems: 'center', marginLeft: '14px' }}>
          <label htmlFor="contained-button-file">
            <Button
              style={{ marginTop: '8px' }}
              variant="contained"
              color="primary"
              component="span"
            >
              Upload
            </Button>
          </label>

          {/* Camera icon */}
          <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file" style={{ marginTop: '4px' }}>
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
      </div>

      <Container fixed>
        {/*  DOCUMENTS */}
        <form onSubmit={handleSubmit}>
          <Paper elevation={3} style={{ padding: '3rem', marginLeft: "1rem", marginBottom: '2rem' }}>
            <InputLabel id="Agent-label" htmlFor="documentType">Tipo Documento*</InputLabel>
            <div style={{ margin: '0rem 2rem 2rem 2rem' }}>
              <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item xs={12} sm={6} md={6} lg={2}>
                  <FormControl style={{ width: '82%' }}>
                    <Select
                      name="DocumentType"
                      label="Tipo Documento"
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
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      name="documentNumber"
                      label="Número Documento"
                      value={formData.documentNumber}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      name="agentRegistrationNumber"
                      label="Número Registro Agente"
                      value={formData.agentRegistrationNumber || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      name="AgentRegistrationComunidadAutonoma"
                      label="Registro Agente Comunidad Autónoma"
                      value={formData.agentRegistrationNumber || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
              </Grid> {/*Grid container*/}
            </div>

            {/*  CONTACT */}
            <div style={{ margin: '0rem 2rem 2rem 2rem' }}>
              <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      name="name"
                      label="Nombre"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      name="surname"
                      label="Apellidos"
                      value={formData.surname}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
              </Grid> {/*Grid container*/}
            </div>

            {/*  CONTACT */}
            <div style={{ margin: '0rem 2rem 2rem 2rem' }}>
              <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      name="mainOfficeCountry"
                      label="Pais*"
                      value={formData.mainOfficeCountry || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      name="mainOfficeProvince"
                      label="Provincia*"
                      value={formData.mainOfficeProvince || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2}>
                  <FormControl style={{ width: '100%' }}>
                    <InputLabel id="zipCode-label">Código Postal*</InputLabel>
                    <Select
                      labelId="zipCode-label"
                      name="mainOfficeZipCode"
                      value={formData.mainOfficeZipCode || ''}
                      onChange={handleChange}
                    >
                    {/*  {zipCodes.map((zipCode) => (
                        <MenuItem key={zipCode.CPOS} value={zipCode}>
                          {zipCode.CPOS}
                        </MenuItem>
                    ))}*/}
                    </Select>
                    {/* <TextField
                      name="mainOfficeZipCode"
                      label="Zip Code"
                      value={formData.mainOfficeZipCode || ''}
                      onChange={handleChange}
                      fullWidth
                    />*/}
                  </FormControl>
                </Grid>
              </Grid> {/*Grid container*/}
            </div>

            <div style={{ margin: '0rem 2rem 2rem 2rem' }}>
              <Grid container spacing={2} bottom={"2rem"} >
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      name="email"
                      label="Email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      name="phone"
                      label="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      name="mobile"
                      label="Mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
              </Grid> {/*Grid container*/}
            </div>

            <div style={{ margin: '2rem 2rem 2rem 2rem' }}>
              <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      name="password"
                      label="Password"
                      value={formData.password}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      name="confirmPassword"
                      label="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </form >
      </Container>

      {/* Botón de envío */}
      < div style={{ display: "flex", justifyContent: "flex-end", height: '2rem', margin: '0rem 10rem 0rem 0rem' }}> {/* Esto es un hack para que el botón no tape los campos de texto */}
        < Button type="submit" variant="contained" color="primary" onClick={handleSubmit} >
          Enviar
        </Button >
      </div >

      {/*  </Box>*/}



    </div >
  )
};