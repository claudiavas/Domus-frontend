(HouseCard)
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, CardActionArea, CardActions, Box, Card, CardContent, CardMedia, Divider, Avatar, Chip, AlertTitle, Tooltip, IconButton } from '@mui/material';
import { PhotoCarousel } from './PhotoCarousel';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../Contexts/AuthContext';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { PhoneNumber } from '../../Contact/PhoneNumber';
import { WhatsAppButton } from '../../Contact/WhatsappButton';
import { LocationContext } from '../../../Contexts/LocationContext';

export default function HouseCard({ _id, user, showRealEstateLogo, selectedProvince, selectedMunicipality, selectedPopulation, selectedNeighborhood, images, currency, price, squareMeters, rooms, transaction, type, furnished, garages, baths, title }) {
  const { profile } = useContext(AuthContext);

  const navigate = useNavigate();
  const showThumbsValue = false;
  const {t} = useTranslation();
  // console.log(`Translation key en housecard: housing.transaction.${transaction}`);
  
  const { locationText } = useContext(LocationContext);

  // useEffect(() => {
  //   // Update the selected location data when the props change
  //   setSelectedProvince(selectedProvince);
  //   setSelectedMunicipality(selectedMunicipality);
  //   setSelectedPopulation(selectedPopulation);
  //   setSelectedNeighborhood(selectedNeighborhood);
  // }, [selectedProvince, selectedMunicipality, selectedPopulation, selectedNeighborhood]);

  const precioxm2 = (price / squareMeters).toFixed(0);
  let currencySymbol = '';
  if (currency === 'USD') {
    currencySymbol = '$';
  } else if (currency === 'EUR') {
    currencySymbol = '€';
  }

  const formattedPrice = (new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }))
    .format(price)
    .replace('.', ' ')
    .replace(',', ',');

  const removeTextInParentheses = (text) => {
    return text.replace(/\([^()]*\)/g, "").trim()
  };

  
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
      <span style={{ flex: '1 0 39%' }}>
        {/* LEFT SIDE */}
        <Card style={{ height: 230 }}>
          <PhotoCarousel showThumbs={showThumbsValue} images={images} style={{ height: '100%' }} />
        </Card>
      </span>

      <span style={{ flex: '1 0 45%', marginLeft: '10px', marginRight: '10px', padding: 0 }}>
        {/* CENTER */}
        <span style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* TOP, CENTER */}
          <Card style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', margin: '0px 0px 8px 0px' }}>
            <div style={{ display: 'inline-flex', margin: '10px 10px 8px 5px' }}>
              {
                <>
                  <Chip label={t(`transaction.${transaction}`, {ns:"housing"})} color="primary" variant="contained" size="small" style={{ marginRight: '15px' }} />
                  <Chip label={t(`type.${type}`, {ns:"housing"})} color="primary" variant="outlined" size="small" style={{ marginRight: '15px' }} />
                  {furnished && <Chip label={t(`furnished.${furnished}`, {ns:"housing"})} color="primary" variant="outlined" size="small" style={{ marginRight: '15px' }} />}
                </>
              }
            </div>
            <h4 style={{ margin: '5px 5px 5px 5px', marginBottom: '5px', flexGrow: 1 }}>{title}</h4>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px', flexGrow: 1 }}>
              <LocationOnOutlinedIcon style={{ marginRight: '5px' }} />
              <h6 style={{ margin: '0px' }}></h6>
              {/* {selectedProvince},{selectedMunicipality},{selectedPopulation},{selectedNeighborhood} */}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', margin: '0px', padding: 0, marginBottom: '5px', flexGrow: 1 }}>
              <FullscreenOutlinedIcon />
              <h5 style={{ margin: '0px', marginLeft: '5px', marginRight: '50px' }}>{squareMeters} m2</h5>
              <BedOutlinedIcon style={{ marginRight: '10px' }} />
              <h5 style={{ margin: '0px' }}>{rooms}</h5>
              {baths ? (
                <div style={{ display: 'flex', alignItems: 'center', margin: '0px', padding: 0, marginBottom: '5px', marginLeft: "60px", flexGrow: 1 }}>
                  <BathtubIcon style={{ marginRight: '10px' }} />
                  <h5 style={{ margin: '0px' }}>{baths}</h5>
                </div>
              ) : (
                <div></div>
              )}
              {garages ? (
                <div style={{ display: 'flex', alignItems: 'center', margin: '0px', padding: 0, marginBottom: '5px', flexGrow: 1 }}>
                  <DirectionsCarIcon style={{ marginRight: '10px' }} />
                  <h5 style={{ margin: '0px' }}>{garages}</h5>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </Card>


          {/* BOTTOM, CENTER */}
          <Card style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: '0px', marginLeft: '5px', padding: "4px" }}>
              <h4 style={{ margin: '0px', padding: 0, color: "#1976d2", display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                {formattedPrice} {currencySymbol}  <div>precio/m2: {precioxm2} {currencySymbol} </div>
                <Button onClick={() => navigate(`/housingdetails/${_id}`)} color="primary" variant="outlined">Ver Más</Button>
              </h4>
            </div>
          </Card>
        </span>
      </span>

      <span>
        {/* RIGHT */}
        <Card style={{ padding: "15px 3px 5px 3px", display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: "150px"}}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
            {user.realEstateLogo && showRealEstateLogo && user.profilePicture ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div><Avatar alt="profile picture" src={user.profilePicture} sx={{ width: 56, height: 56 }} /></div>
                <div><Avatar alt="real estate logo" src={user.realEstateLogo} sx={{ width: 75, height: 75 }} /></div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {user.profilePicture ? (
                  <div><Avatar alt="profile picture" src={user.profilePicture} sx={{ width: 56, height: 56 }} /></div>
                ) : (

                  <Avatar sx={{ width: 56, height: 56 }} />
                )}
              </div>
            )}
          </div>

          <div style={{ alignSelf: 'center', marginTop: '10px' }}>
            <h4 style={{ fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
              {user.name} {user.surname}
            </h4>
          </div>

          {user.agentRegistrationNumber && user.agentRegistrationCommunity &&
            <Tooltip title={`Registro No. ${profile.agentRegistrationNumber} C.A. de ${profile.agentRegistrationCommunity}`}>
              <IconButton
                size="small"
                style={{ marginBottom: '5px' }}
                color="success"
              >
                <CardMembershipIcon fontSize="medium" />
              </IconButton>
            </Tooltip>}



          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>

          {user.telephone1 && 
            <WhatsAppButton phoneNumber={user.telephone1} />}
           

          {user.telephone2 && 
            <PhoneNumber phoneNumber={user.telephone2} />}

          <Tooltip title={user.email} arrow>
            <IconButton
              component="a"
              href={`mailto:${user.email}`}
              size="small"
              style={{ marginBottom: '5px' }}
              color="primary"
            >
              <EmailOutlinedIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          </div>

        </Card>
      </span>
    </Box >
  )
}
