import * as React from 'react';
import { Button, CardActionArea, CardActions, Box, Card, CardContent, CardMedia, Divider } from '@mui/material';
import PhotoCarousel from './PhotoCarousel';

function HouseCard (_id, province, municipality, population, neighborhood, 
  description, currency, price, square_meters, rooms, baths) {
    
  return (

    <Box
      component="main"
      sx={{
        flexGrow: 3,
        p: 3,
        width: { sm: `calc(100%)` },
        height: 160,
        display: 'flex', // Agregamos display flex al contenedor principal
        border: 1,
        padding: 1
      }}
    >
    
      <span style={{ flex: '1 0 40%'}}>
        {/* LEFT SIDE */}
        <Card sx={{ maxWidth: 345 }}>
          <PhotoCarousel/>
        </Card>
      </span>

      <span style={{ flex: '1 0 40%', marginRight: '10px' }}>
        {/* CENTER */}
        
        <span style={{ height: '80%', marginBottom: '10px' }}>
          {/* TOP, CENTER*/}
          <Card sx={{ maxWidth: 345 }}>
          <h5>{description}</h5>
          <h5>{province}, {municipality}, {population}, {neighborhood}  </h5>
          <h5>{square_meters}</h5>
          <h5>{rooms}</h5>
          <h5>{baths}</h5>
                    
          <Divider/>
          </Card>
        </span>
        
        <span style={{ height: '20%' }}>
          {/* BOTTOM, CENTER */}
          <Card sx={{ maxWidth: 345 }}>
          <h5>{currency}</h5>
          <h5>{price}</h5>
          </Card>
        </span>
      </span>

      <span style={{ flex: '1 0 20%' }}>
        {/* RIGHT */}
        <Card sx={{ maxWidth: 345 }}>
          Contacto
        </Card>
      </span>

    </Box>

  )}

export default HouseCard;