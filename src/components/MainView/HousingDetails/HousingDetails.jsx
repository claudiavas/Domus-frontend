import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Grid, Typography } from '@mui/material/';
import { PhotoCarousel } from '../HousingList/Card/PhotoCarousel';
import Paper from '@mui/material/Paper';

export const HousingDetails = () => {

  const { slug } = useParams(); // Recibiendo los parámetros del slug

  const [housingData, setHousingData] = useState(null);

  const showThumbsValue = true;

  //const { images, type, transaction, country, community, province, municipality, population } = housingData;


  useEffect(() => {

    // axios.get(`/api/housing/${slug}`)
    //   .then(response => {
    //     setHousingData(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    const fakeHousingData = {
      images: [],
      type: 'apartment',
      transaction: 'sale',
      country: 'Spain',
      community: 'Community Name',
      province: 'Province Name',
      municipality: 'Municipality Name',
      population: 'Population Name',
      // Agrega el resto de los campos del modelo aquí
    };
    
    setHousingData(fakeHousingData);
  }, [slug]);

  const fakeRealEstateData = {
    name: 'Real Estate Name',
    // Agrega el resto de los campos del modelo de inmobiliaria aquí
  };

  const fakeUserData = {
    name: 'User Name',
    // Agrega el resto de los campos del modelo de usuario aquí
  };


  if (!housingData) {
    return <div>Loading...</div>;
  }

  return (

    //  HEADING

    <div style={{ margin: '0 3rem 3rem 3rem' }}>
    <h1 style={{ marginTop: 0, background: '#1976d2', color: 'white', padding: '0.5rem' }}>Detalle del Inmueble</h1>

    <Grid container spacing={3}>
      <Grid item xs={8} style={{ gridColumn: '1 / span 8' }}>
      <PhotoCarousel showThumbs={showThumbsValue} />
        {housingData.images.map((image, index) => (
          <img key={index} src={image} alt={`Property Image ${index}`} />
        ))}
      </Grid>

      <Paper style={{ height: '300px', overflowY: 'scroll' }}>
      {/* Contenido de la columna */}
   
      <Grid item xs={8} style={{ gridColumn: '1 / span 8' }}>
        {/* Datos del inmueble */}
        <Typography variant="h6">Property Details</Typography>
        <Typography>Type: {housingData.type}</Typography>
        <Typography>Transaction: {housingData.transaction}</Typography>
        <Typography>Country: {housingData.country}</Typography>
        <Typography>Community: {housingData.community}</Typography>
        <Typography>Province: {housingData.province}</Typography>
        <Typography>Municipality: {housingData.municipality}</Typography>
        <Typography>Population: {housingData.population}</Typography>
        <Typography variant="h6">Property Details</Typography>
        <Typography>Type: {housingData.type}</Typography>
        <Typography>Transaction: {housingData.transaction}</Typography>
        <Typography>Country: {housingData.country}</Typography>
        <Typography>Community: {housingData.community}</Typography>
        <Typography>Province: {housingData.province}</Typography>
        <Typography>Municipality: {housingData.municipality}</Typography>
        <Typography>Population: {housingData.population}</Typography>
        <Typography variant="h6">Property Details</Typography>
        <Typography>Type: {housingData.type}</Typography>
        <Typography>Transaction: {housingData.transaction}</Typography>
        <Typography>Country: {housingData.country}</Typography>
        <Typography>Community: {housingData.community}</Typography>
        <Typography>Province: {housingData.province}</Typography>
        <Typography>Municipality: {housingData.municipality}</Typography>
        <Typography>Population: {housingData.population}</Typography>
        <Typography variant="h6">Property Details</Typography>
        <Typography>Type: {housingData.type}</Typography>
        <Typography>Transaction: {housingData.transaction}</Typography>
        <Typography>Country: {housingData.country}</Typography>
        <Typography>Community: {housingData.community}</Typography>
        <Typography>Province: {housingData.province}</Typography>
        <Typography>Municipality: {housingData.municipality}</Typography>
        <Typography>Population: {housingData.population}</Typography>
        <Typography variant="h6">Property Details</Typography>
        <Typography>Type: {housingData.type}</Typography>
        <Typography>Transaction: {housingData.transaction}</Typography>
        <Typography>Country: {housingData.country}</Typography>
        <Typography>Community: {housingData.community}</Typography>
        <Typography>Province: {housingData.province}</Typography>
        <Typography>Municipality: {housingData.municipality}</Typography>
        <Typography>Population: {housingData.population}</Typography>
        <Typography variant="h6">Property Details</Typography>
        <Typography>Type: {housingData.type}</Typography>
        <Typography>Transaction: {housingData.transaction}</Typography>
        <Typography>Country: {housingData.country}</Typography>
        <Typography>Community: {housingData.community}</Typography>
        <Typography>Province: {housingData.province}</Typography>
        <Typography>Municipality: {housingData.municipality}</Typography>
        <Typography>Population: {housingData.population}</Typography>
        {/* Agrega el resto de los campos del modelo de inmueble aquí */}
      </Grid>

      </Paper>

      <Grid item xs={4} style={{ gridColumn: '9 / span 4' }}>
        {/* Datos de la inmobiliaria */}
        <Typography variant="h6">Real Estate Details</Typography>
        <Typography>Name: {fakeRealEstateData.name}</Typography>
        {/* Agrega el resto de los campos del modelo de inmobiliaria aquí */}
      </Grid>
      <Grid item xs={4} style={{ gridColumn: '9 / span 4' }}>
        {/* Datos del usuario */}
        <Typography variant="h6">User Details</Typography>
        <Typography>Name: {fakeUserData.name}</Typography>
        {/* Agrega el resto de los campos del modelo de usuario aquí */}
      </Grid>
    </Grid>
  </div>
  );
};
