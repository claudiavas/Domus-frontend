import React, { useState, useContext, useEffect } from 'react';
import { Box, Grid, Paper, TextField, Button, IconButton, Avatar, FormControl, InputLabel, Select, MenuItem, Typography, Checkbox } from '@mui/material';
import { Container } from '@mui/material';
import axios from 'axios';
import { LocationContext } from '../../Contexts/LocationContext';
import { Images } from '../Images/Images';
import { ImagesContext } from '../../Contexts/ImagesContext';
import { Dining } from '@mui/icons-material';

export const EditUserProfile = () => {

  const { provinces } = useContext(LocationContext);
  const { communities } = useContext(LocationContext);
  const { imageUrls, setImageUrls } = useContext(ImagesContext);



  const [formData, setFormData] = useState({
    DocumentType: 'DNI',
    country: 'España',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;



    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData); // Aquí puedes realizar la lógica para enviar los datos actualizados al servidor
    try {
      const response = await EditUserProfile(formData);
      console.log(formData, formData)
      //  setformData([...user, formData]);
    } catch (error) {
      console.error(error);
    }

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
            src={imageUrls[0]}
          />
        </div>
        {/* Upload button */}
        <div style={{ display: 'grid', gap: '2px', justifyItems: 'center', marginLeft: '14px' }}>
          <label htmlFor="contained-button-file">
            <Button
              style={{ marginTop: '8px' }}
              variant="outlined"
              color="primary"
              component="span"
            >
              <Images />
            </Button>
          </label>
        </div>
      </div>

      <Container fixed>
        {/*  DOCUMENTS */}
        <form onSubmit={handleSubmit}>
          <Paper elevation={3} style={{ padding: '3rem', marginLeft: "1rem", marginBottom: '2rem', marginTop: '2rem' }}>
            {/*<InputLabel id="Agent-label" htmlFor="documentType">Tipo Documento*</InputLabel>*/}
            <div style={{ margin: '0rem 2rem 2rem 2rem' }}>
              <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item xs={12} sm={6} md={6} lg={2}>
                  <FormControl style={{ width: '82%' }}>
                    <Select
                      name="DocumentType"
                      value={formData.DocumentType}
                      label="Tipo Documento"
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
                    <InputLabel htmlFor="documentNumber" id="documentNumber-label">Número Documento</InputLabel>
                    <TextField
                      name="documentNumber"
                      labelId="documentNumber-label"
                      value={formData.documentNumber}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{ htmlFor: 'documentNumber', id: 'documentNumber-label' }}
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
                    <InputLabel id="communities-label">Comunidad Autónoma*</InputLabel>
                    <Select
                      labelId="communities-label"
                      id="AgentRegistrationComunidadAutonoma"
                      label="Comunidad Autónoma"
                      name="AgentRegistrationComunidadAutonoma"
                      value={formData.agentRegistrationCommunity}
                      onChange={handleChange}
                    >
                      {communities.map((community) => (
                        <MenuItem key={community.CCOM} value={community}>
                          {community.COM}
                        </MenuItem>
                      ))}
                    </Select>
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
                      value={formData.mainOfficeCountry || 'España'}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <FormControl style={{ width: '100%' }}>
                    <InputLabel id="province-label">Provincia*</InputLabel>
                    <Select
                      labelId="province-label"
                      id="mainOfficeprovince"
                      name="mainOfficeprovince"
                      value={formData.mainofficeprovince}
                      onChange={handleChange}
                    >
                      {provinces.map((province) => (
                        <MenuItem key={province.CPRO} value={province}>
                          {province.PRO}
                        </MenuItem>
                      ))}
                    </Select>
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
                      label="Teléfono"
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
                      label="Móvil"
                      value={formData.mobile}
                      onChange={handleChange}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
              </Grid> {/*Grid container*/}
            </div>
            {/* Boton de Resetear Password*/}
            <div style={{ margin: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Checkbox color="primary" />
                <span style={{ marginLeft: '0.5rem' }}>
                  Quiero recibir inspiración, promociones de marketing y actualizaciones vía email.
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    margin: '0 1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    backgroundColor: '#2196f3',
                    color: '#fff',
                  }}
                >
                  Reset Password
                </Button>
              </div>
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