import React, { useContext } from 'react';
import { Button, CardActionArea, CardActions, Box, Card, CardContent, CardMedia, Divider, Avatar } from '@mui/material';
import { PhotoCarousel } from './PhotoCarousel';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../Contexts/AuthContext';


export function HouseCard ({_id, province, municipality, population, neighborhood, 
  description, currency, price, squareMeters, rooms}) {
    
    const navigate = useNavigate()
    const showThumbsValue = false;

    const { profile } = useContext(AuthContext);

    console.log("profile", profile)

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
        padding: 0,
        marginBottom: 1.5
      }}
    >
    
      <span style={{ flex: '1 0 40%'}}>
        {/* LEFT SIDE */}
        <Card>
        <PhotoCarousel showThumbs={showThumbsValue} />
        </Card>
      </span>

      <span style={{ flex: '1 0 40%', marginLeft: '10px', marginRight: '10px', padding: 0 }}>
        {/* CENTER */}
        
        <span style={{ height: '80%' }}>
          {/* TOP, CENTER*/}
          <Card>
          <h4>{description}</h4>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnOutlinedIcon style={{ marginRight: '5px' }} />
            {/* {municipality !== province ? <h5>{province}, {municipality} </h5> : <h5>{province} </h5>}
            {population !== municipality && <h5>, {population} </h5>}
            <h5>, {neighborhood}</h5> */}
          </div>
                    
          <div style={{ display: 'flex', alignItems: 'center', margin: '0px', padding: 0  }}>
           <FullscreenOutlinedIcon/>
            <h5>{squareMeters} m2</h5>
            <span style={{ marginRight: '50px' }}></span>
            <BedOutlinedIcon style={{ marginRight: '10px' }} />
            <h5>{rooms}</h5>
          </div>             
          <Divider/>
          </Card>
        </span>
        
        <span style={{ height: '20%' }}>
          {/* BOTTOM, CENTER */}
          <Card>
          <div style={{ marginTop: '0px', padding: "4px"  }}>
            <h4 style={{ margin: '0px', padding: 0, color: "#1976d2", display: "flex", justifyContent: 'space-between', alignItems: "center",}}>
              {currencySymbol} {price}
              <Button color="primary" variant="outlined">Ver Más</Button>
            </h4>
          </div>
          </Card>
        </span>
      </span>

      <span style={{ flex: '1 0 20%', margin: '0px', padding: 0  }}>
        {/* RIGHT */}
        <Card>
          Logo Inmobiliaria
          Avatar Agente
          Nombre y Appellido Agente
          <br/>
         <LocalPhoneOutlinedIcon/>
         <EmailOutlinedIcon/>
        </Card>
      </span>



        </Box>
      )
}
      