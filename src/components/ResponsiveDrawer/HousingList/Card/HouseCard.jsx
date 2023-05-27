import * as React from 'react';
import { Button, CardActionArea, CardActions, Box, Card, CardContent, CardMedia, Divider } from '@mui/material';
import PhotoCarousel from './PhotoCarousel';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function HouseCard ({_id, province, municipality, population, neighborhood, 
  description, currency, price, squareMeters, rooms, baths}) {
    
    let currencySymbol = '';
    if (currency === 'USD') {
      currencySymbol = '$';
    } else if (currency === 'EUR') {
      currencySymbol = '€';
    }

  return (

    <Box
      component="main"
      sx={{
        flexGrow: 3,
        display: 'flex',
        border: 1,
        padding: 0,
        marginBottom: 1
      }}
    >
    
      <span style={{ flex: '1 0 40%'}}>
        {/* LEFT SIDE */}
        <Card>
          <PhotoCarousel/>
        </Card>
      </span>

      <span style={{ flex: '1 0 40%', marginLeft: '10px' }}>
        {/* CENTER */}
        
        <span style={{ height: '80%', marginBottom: '10px' }}>
          {/* TOP, CENTER*/}
          <Card>
          <h4>{description}</h4>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnOutlinedIcon style={{ marginRight: '5px' }} />
            {municipality !== province ? <h5>{province}, {municipality} </h5> : <h5>{province} </h5>}
            {population !== municipality && <h5>, {population} </h5>}
            <h5>, {neighborhood}</h5>
          </div>
                    
          <div style={{ display: 'flex', alignItems: 'center' }}>
           <FullscreenOutlinedIcon/>
            <h5>{squareMeters} m2</h5>
            <span style={{ marginRight: '50px' }}></span>
            <BedOutlinedIcon style={{ marginRight: '10px' }} />
            <h5>{rooms}</h5>
          </div>             
          <Divider/>
          </Card>
        </span>
        
        <span style={{ height: '20%'}}>
          {/* BOTTOM, CENTER */}
          <Card>
          <div style={{ display: 'flex', marginLeft: '10px' }}>
            <h4 style={{ color: "#1976d2"}}>
              {currencySymbol} {price.toLocaleString('es-ES')}
              <span style={{ marginRight: '120px' }}></span>
              <Button color="primary" variant="outlined">Ver Más</Button>
            </h4>
          </div>
          </Card>
        </span>
      </span>

      <span style={{ flex: '1 0 20%' }}>
        {/* RIGHT */}
        <Card>
          Logo Inmobiliaria
          Avatar Agente
          Nombre y Appellido Agente
          <br/>
         <LocalPhoneOutlinedIcon/>
         <EmailOutlinedIcon from/>
        </Card>
      </span>

    </Box>

  )}

export default HouseCard;