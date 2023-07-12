import React, { useContext } from 'react';
import { Button, CardActionArea, CardActions, Box, Card, CardContent, CardMedia, Divider, Avatar, Chip } from '@mui/material';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../Contexts/AuthContext';
import { TranslationContext } from '../../../Contexts/TranslationContext';


export function RequestCard ({realState, agent, type, transaction,country, community, province, municipality,
  population, neighborhood, minM2, maxM2, currency, minPrice, maxPrice, floorLevel, 
  facing, propertyAge, rooms, baths, garages, condition, furnished, kitchenEquipment, 
  closets, airConditioned, heating, elevator, outsideView, garden, pool, terrace, storage,
  accesible, status, _id}) {
    
    const navigate = useNavigate()
    const showThumbsValue = false;

    const { profile } = useContext(AuthContext);
    const translations = useContext(TranslationContext);

    // console.log("translations.type:", translations.type);

    //const precioxm2 = (price / squareMeters).toFixed(0);

    let currencySymbol = '';
    if (currency === 'USD') {
      currencySymbol = '$';
    } else if (currency === 'EUR') {
      currencySymbol = '€';
    }

    // LE DAMOS FORMATO AL PRECIO
    // LE damos formato al precio minimo y al precio maximo
    const formattedMinPrice = (new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }))
    .format(minPrice)
    .replace('.', ' ')
    .replace(',', ',');
    const formattedMaxPrice = (new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }))
    .format(maxPrice)
    .replace('.', ' ')
    .replace(',', ',');

    // LE DAMOS FORMATO A LA UBICACIÓN
    
    const removeTextInParentheses = (text) => {
      return text.replace(/\([^()]*\)/g, "").trim()
    };
    
   // const locationText = [
   //   province.PRO,
   //   municipality.DMUN50,
   //   population.NENTSI50,
   //   neighborhood.NNUCLE50
   // ]
   //   .filter(Boolean)
   //   .filter((value, index, self) => self.indexOf(value) === index)
   //   .map(removeTextInParentheses)
   //   .join(", ")
    

      return (
        <Box
          component="main"
          sx={{
            flexGrow: 3,
            display: 'flex',
            padding: 0,
            margin: '-5px 15px 20px -20px',
            height: '230px'
          }}
        >
      
          <span style={{ flex: '1 0 45%', marginLeft: '10px', marginRight: '10px', padding: 0  }}>
            {/* CENTER */}
            <span style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* TOP, CENTER */}
              <Card style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', margin: '0px 0px 8px 0px'}}>
              <div style={{ display: 'inline-flex', margin: '10px 10px 8px 5px' }}>
              </div>
                <h4 style={{ margin: '5px 5px 5px 5px', marginBottom: '5px', flexGrow: 1 }}>{}</h4>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px', flexGrow: 1 }}>
                  <LocationOnOutlinedIcon style={{ marginRight: '5px' }} />
                  <h6 style={{ margin: '0px' }}>{}</h6>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '0px', padding: 0, marginBottom: '5px', flexGrow: 1 }}>
                  <FullscreenOutlinedIcon />
                  <h5 style={{ margin: '0px', marginLeft: '5px', marginRight: '50px' }}>{minM2} m2</h5>
                  <BedOutlinedIcon style={{ marginRight: '10px' }} />
                  <h5 style={{ margin: '0px', marginLeft: '5px', marginRight: '50px' }}>{maxM2} m2</h5>
                  <BedOutlinedIcon style={{ marginRight: '10px' }} />
                  <h5 style={{ margin: '0px' }}>{rooms}</h5>
                  {baths ? 
                    <div style={{ display: 'flex', alignItems: 'center', margin: '0px', padding: 0, marginBottom: '5px', marginLeft: "60px", flexGrow: 1 }}>
                      <BathtubIcon style={{ marginRight: '10px' }} />
                      <h5 style={{ margin: '0px' }}>{baths}</h5>
                    </div> :
                    <div></div>
                  }
                  {garages ?
                    <div style={{ display: 'flex', alignItems: 'center', margin: '0px', padding: 0, marginBottom: '5px', flexGrow: 1 }}>
                      <DirectionsCarIcon style={{ marginRight: '10px' }} />
                      <h5 style={{ margin: '0px' }}>{garages}</h5>
                    </div> :
                    <div></div>
                  }
                </div>
              </Card>

      
              {/* BOTTOM, CENTER */}
              <Card style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: '0px', marginLeft: '5px', padding: "4px" }}>
                  <h4 style={{ margin: '0px', padding: 0, color: "#1976d2", display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                     <div>Precio Minimo: {minPrice} {currencySymbol} </div>
                    <div>Precio Máximo: {maxPrice} {currencySymbol} </div>
                    <Button onClick={() => navigate(`/housingdetails/${_id}`)} color="primary" variant="outlined">Editar</Button>
                  </h4>
                </div>
              </Card>
            </span>
          </span>
          <span style={{ flex: '1 0 39%' }}>
            {/* LEFT SIDE */}
            <Card style={{ height: 230 }}>
              {/*<PhotoCarousel showThumbs={showThumbsValue} style={{ height: '100%'}} />*/}
            </Card>
          </span>
          <span>
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
                      <Avatar sx={{ width: 55, height: 55 }}/>
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
                    <LocalPhoneOutlinedIcon fontSize='extrasmall' style={{ marginRight: '5px' }}/>
                    <span><h5>{profile.phone}</h5></span>
                  </div>
                )}
                {profile.email && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <EmailOutlinedIcon fontSize='extrasmall' style={{ marginRight: '5px' }} />
                    <span><h6>{profile.email}</h6></span>
                  </div>
                )}
              </div>
            </Card>
          </span>
        </Box>
      )
}
      