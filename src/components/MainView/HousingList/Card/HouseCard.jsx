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

    // LE DAMOS FORMATO A LA UBICACIÓN
    
    const removeTextInParentheses = (text) => {
      return text.replace(/\([^()]*\)/g, "").trim()
    };
    
    const locationText = [
      province.PRO,
      municipality.DMUN50,
      population.NENTSI50,
      neighborhood.NNUCLE50
    ]
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(removeTextInParentheses)
      .join(", ")
    

      return (
        <Box
          component="main"
          sx={{
            flexGrow: 3,
            display: 'flex',
            padding: 0,
            margin: '-5px 15px 20px -20px',
          }}
        >
          <span style={{ flex: '1 0 30%' }}>
            {/* LEFT SIDE */}
            <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              <PhotoCarousel showThumbs={showThumbsValue} style={{ height: '100%' }} />
            </Card>
          </span>
      
          <span style={{ flex: '1 0 50%', marginLeft: '10px', marginRight: '10px', padding: 0 }}>
            {/* CENTER */}
            <span style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* TOP, CENTER */}
              <Card style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', margin: '0px 0px 8px 0px'}}>
                <h4 style={{ margin: '3px 3px 0px 5px', marginBottom: '5px', flexGrow: 1 }}>{description}</h4>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px', flexGrow: 1 }}>
                  <LocationOnOutlinedIcon style={{ marginRight: '5px' }} />
                  <h6 style={{ margin: '0px' }}>{locationText}</h6>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '0px', padding: 0, marginBottom: '5px', flexGrow: 1 }}>
                  <FullscreenOutlinedIcon />
                  <h5 style={{ margin: '0px', marginLeft: '5px', marginRight: '50px' }}>{squareMeters} m2</h5>
                  <BedOutlinedIcon style={{ marginRight: '10px' }} />
                  <h5 style={{ margin: '0px' }}>{rooms}</h5>
                </div>
              </Card>

      
              {/* BOTTOM, CENTER */}
              <Card style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: '0px', padding: "4px" }}>
                  <h4 style={{ margin: '0px', padding: 0, color: "#1976d2", display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                    {currencySymbol} {price.toLocaleString('es-ES')}
                    <Button onClick={() => navigate(`/housingdetails/${_id}`)} color="primary" variant="outlined">Ver Más</Button>
                  </h4>
                </div>
              </Card>
            </span>
          </span>
      
          <span style={{ flex: '1 0 10%', margin: '0px', padding: 0 }}>
            {/* RIGHT */}
            <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                {profile.realEstateLogo && profile.avatar ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div>{profile.avatar}</div>
                    <div>{profile.realEstateLogo}</div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {profile.avatar ? (
                      profile.avatar
                    ) : (
                      <Avatar sx={{ width: 56, height: 56 }} src="/broken-image.jpg" />
                    )}
                  </div>
                )}
              </div>
              <div style={{ alignSelf: 'center', marginTop: '10px' }}>
                <h4 style={{ fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
                  {profile.name} {profile.surname}
                </h4>
              </div>
              <div style={{ marginTop: 'auto' }}>
                {profile.phone && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <LocalPhoneOutlinedIcon fontSize='small' style={{ marginRight: '5px' }}/>
                    <span><h5>{profile.phone}</h5></span>
                  </div>
                )}
                {profile.email && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <EmailOutlinedIcon fontSize='small' style={{ marginRight: '5px' }} />
                    <span><h5>{profile.email}</h5></span>
                  </div>
                )}
              </div>
            </Card>
          </span>



        </Box>
      )
}
      