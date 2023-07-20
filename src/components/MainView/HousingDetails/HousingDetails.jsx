import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import { Grid, Typography, TextField, Input, Card, Chip, Divider, Checkbox } from '@mui/material/';
import Paper from '@mui/material/Paper';
import { getActiveHousing, getHouse, updateHousing } from '../../apiService/apiService';
import { PhotoGallery } from './PhotoGallery';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Contexts/AuthContext';
import { HousingContext } from '../../Contexts/HousingContext';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { PhoneNumber } from '../Contact/PhoneNumber';
import { WhatsAppButton } from '../Contact/WhatsappButton';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Avatar } from '@mui/material';
import { Tooltip } from '@mui/material';
import { Header } from '../../HomePage/Header/Header';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export const HousingDetails = () => {

  const navigate = useNavigate()
  const { _id } = useParams(); // Obtener el parámetro de la URL
  console.log("_id en HousingDetails", _id)
  const { housing } = useContext(HousingContext);
  console.log("housing en HousingDetails", housing)
  const { profile } = useContext(AuthContext);
  const {t} = useTranslation();

  const housingData = housing.find((item) => item._id === _id);

  // Buscar la vivienda por ID
  useEffect(() => {
    console.log("housingData en HousingDetails", housingData)
  }, [housing]);

  if (!housingData) {
    return <div>Vivienda no encontrada</div>;
  }
  const user = housingData.user
  console.log("user en HousingDetails", user)


  const precioxm2 = (housingData.price / housingData.squareMeters).toFixed(0);
  let currencySymbol = '';
  if (housingData.currency === 'USD') {
    currencySymbol = '$';
  } else if (housingData.currency === 'EUR') {
    currencySymbol = '€';
  }

  const formattedPrice = (new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }))
    .format(housingData.price)
    .replace('.', ' ')
    .replace(',', ',');

  const removeTextInParentheses = (text) => {
    return text.replace(/\([^()]*\)/g, "").trim()
  };

  const locationText = [
    housingData.province.PRO,
    housingData.municipality.DMUN50,
    housingData.population.NENTSI50,
    housingData.neighborhood.NNUCLE50
  ]
    .filter(Boolean)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map(removeTextInParentheses)
    .join(", ");


  const booleanItems = [
    housingData.airConditioned && { label: 'Aire acondicionado', value: housingData.airConditioned },
    housingData.heating && { label: 'Calefacción', value: housingData.heating },
    housingData.elevator && { label: 'Ascensor', value: housingData.elevator },
    housingData.storage && { label: 'Trastero', value: housingData.storage },
    housingData.outsideView && { label: 'Vista Exterior', value: housingData.outsideView },
    housingData.garden && { label: 'Jardín', value: housingData.garden },
    housingData.pool && { label: 'Piscina', value: housingData.pool },
    housingData.terrace && { label: 'Terraza', value: housingData.terrace },
    housingData.closets && { label: 'Closets', value: housingData.closets },
    housingData.accessible && { label: 'Accesible', value: housingData.accessible },
  ];

  const halfLength = Math.ceil(booleanItems.length / 2);
  const firstHalf = booleanItems.slice(0, halfLength);
  const secondHalf = booleanItems.slice(halfLength);
  
  const transaction = housingData.transaction
  const type = housingData.type
  const furnished = housingData.furnished
  const floorLevel = housingData.floorLevel
  const facing = housingData.facing
  const propertyAge = housingData.propertyAge
  const condition = housingData.condition
  const kitchenEquipment = housingData.kitchenEquipment


  const handleDeleteHousing = async (_id, status) => {
    updateHousing(_id, { status: "DELETED" });
      navigate("/mainview");
      alert("Vivienda eliminada correctamente")
  
  }

  return (
    <div style={{ margin: '0 3rem 3rem 3rem' }}>
      {/* HEADING */}
      <h1 style={{ marginTop: 0, background: '#1976d2', color: 'white', padding: '0.5rem', display: 'flex', justifyContent: 'space-between' }}><Header component="Detalle del Inmueble" /></h1>

      {/* PHOTOGALLERY */}
      <PhotoGallery itemData={housingData.images} />

      <Grid container spacing={1}>
        {/* TITLE */}
        <Grid item xs={12} md={12} lg={12}>
          {housingData.title && <Typography variant="h6">{housingData.title}</Typography>}
        </Grid>


        {/* FIRST COLUMN */}

        {/* CHIPS */}
        <Grid item xs={12} md={6} lg={5} >

          <Card style={{ height: "100%" }}>
            <div style={{ padding: "8px 8px 8px 8px", display: 'inline-flex' }}>
              <Chip label={t(`transaction.${transaction}`, {ns:"housing"})} color="primary" variant="contained" size="small" style={{ marginRight: '15px' }} />
              <Chip label={t(`type.${type}`, {ns:"housing"})} color="primary" variant="outlined" size="small" style={{ marginRight: '15px' }} />
              {housingData.furnished && <Chip label={t(`furnished.${furnished}`, {ns:"housing"})} color="primary" variant="outlined" size="small" style={{ marginRight: '15px' }} />}
            </div>


            {/* LOCATION */}

            <div style={{ padding: "8px 8px 8px 8px", display: 'flex', alignItems: 'center', marginBottom: '5px', flexGrow: 1 }}>
              <LocationOnOutlinedIcon style={{ marginRight: '5px' }} />
              <h6 style={{ margin: '0px' }}>{locationText}</h6>
            </div>


            {/* ADDRESS */}

            <Grid item xs={6} style={{ padding: "8px 8px 8px 8px" }}>
              {housingData.houseNumber && <Typography>Número de portal: {housingData.houseNumber}</Typography>}
              {housingData.floor && <Typography>Piso: {housingData.floor}</Typography>}
              {housingData.door && <Typography>Puerta: {housingData.door}</Typography>}
              {housingData.stair && <Typography>Escalera: {housingData.stair}</Typography>}
            </Grid>

            <Divider style={{ margin: "10px" }} />

            {/* DESCRIPTION */}

            <div style={{ padding: "8px 8px 8px 8px" }}>
              {housingData.description && <Typography variant="p">{housingData.description}</Typography>}
            </div>
          </Card>
        </Grid>

        {/* SECOND COLUMN */}
        <Grid item xs={12} md={6} lg={5} style={{ position: 'sticky', top: 0, zIndex: 999, height: '100%' }}>
          {/* MAIN ICONS */}
          <Card style={{ padding: "8px 8px 8px 8px", height: "100%" }}>
            <div style={{ display: 'flex', alignItems: 'center', margin: '0px', padding: 0, marginBottom: '5px', flexGrow: 1 }}>
              <FullscreenOutlinedIcon />
              <h5 style={{ margin: '0px', marginLeft: '5px', marginRight: '50px' }}>{housingData.squareMeters} m2</h5>
              <BedOutlinedIcon style={{ marginRight: '10px' }} />
              <h5 style={{ margin: '0px' }}>{housingData.rooms}</h5>
              {housingData.baths ? (
                <div style={{ display: 'flex', alignItems: 'center', margin: '0px', padding: 0, marginBottom: '5px', marginLeft: "60px", flexGrow: 1 }}>
                  <BathtubIcon style={{ marginRight: '10px' }} />
                  <h5 style={{ margin: '0px' }}>{housingData.baths}</h5>
                </div>
              ) : (
                <div></div>
              )}
              {housingData.garages ? (
                <div style={{ display: 'flex', alignItems: 'center', margin: '0px', padding: 0, marginBottom: '5px', flexGrow: 1 }}>
                  <DirectionsCarIcon style={{ marginRight: '10px' }} />
                  <h5 style={{ margin: '0px' }}>{housingData.garages}</h5>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <Divider style={{ margin: "10px" }} />

            {/* TEXT ESPECIFICATIONS */}

            <div style={{ padding: "8px 8px 8px 8px" }}>
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  {housingData.floorLevel && (
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Nivel de piso:</Typography>
                  )}
                  {housingData.facing && (
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Orientación:</Typography>
                  )}
                  {housingData.propertyAge && (
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Antigüedad del inmueble:</Typography>
                  )}
                  {housingData.condition && (
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Condición:</Typography>
                  )}
                  {housingData.furnished && (
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Amueblado:</Typography>
                  )}
                  {housingData.kitchenEquipment && (
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Equipamiento de cocina:</Typography>
                  )}
                </Grid>
                <Grid item xs={5}>
                  {housingData.floorLevel && <Typography variant="subtitle1">{t(`floorLevel.${floorLevel}`, {ns:"housing"})}</Typography>}
                  {housingData.facing && <Typography variant="subtitle1">{t(`facing.${facing}`, {ns:"housing"})}</Typography>}
                  {housingData.propertyAge && <Typography variant="subtitle1">{t(`propertyAge.${propertyAge}`, {ns:"housing"})}</Typography>}
                  {housingData.condition && <Typography variant="subtitle1">{t(`condition.${condition}`, {ns:"housing"})}</Typography>}
                  {housingData.furnished && <Typography variant="subtitle1">{t(`furnished.${furnished}`, {ns:"housing"})}</Typography>}
                  {housingData.kitchenEquipment && <Typography variant="subtitle1">{t(`kitchenEquipment.${kitchenEquipment}`, {ns:"housing"})}</Typography>}
                </Grid>
              </Grid>
            </div>

            <Divider style={{ margin: "10px" }} />

            {/* BOOLEAN ESPECIFICATIONS */}
            <Grid container spacing={0.5}>
              {booleanItems.map((item, index) => (
                item && (
                  <Grid item xs={6} key={index}>
                    <Typography>
                      <Checkbox checked={true} />
                      {item.label && <span>{item.label}</span>} {item.value && <span>{item.value}</span>}
                    </Typography>
                  </Grid>
                )
              ))}
            </Grid>



          </Card>
        </Grid>


        {/* THIRD COLUMN */}

        <Grid item xs={12} md={4} lg={2} style={{ position: 'sticky', top: 0, zIndex: 999 }}>
          {/* PRICING */}

          <Card style={{ height: "100%" }}>
            <div style={{ margin: '8px 8px 8px 8px' }}>
              <h4 style={{ margin: '0px', padding: 0, color: "#1976d2", alignItems: "center" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}><Typography>Precio:</Typography> {formattedPrice} {currencySymbol}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}><Typography>Precio/m2:</Typography> {precioxm2} {currencySymbol}</div>
              </h4>
            </div>

            <Divider style={{ margin: "10px" }} />


            {/* AGENT */}


            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
              {user.realEstateLogo && housingData.showRealEstateLogo && user.profilePicture ? (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

            <div style={{ alignSelf: 'center', marginTop: '20px', marginBottom: '20px' }}>
              <h4 style={{ fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
                {user.name} {user.surname}
              </h4>
            </div>
            <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
              {user.agentRegistrationNumber && user.agentRegistrationCommunity && (
                <Tooltip title={`Registro No. ${profile.agentRegistrationNumber} C.A. de ${profile.agentRegistrationCommunity}`}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small" color="success" style={{ margin: '0 2px 0 0' }}>
                      <CardMembershipIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2">{`${profile.agentRegistrationNumber} C.A. de ${profile.agentRegistrationCommunity}`}</Typography>
                  </div>
                </Tooltip>
              )}
            </div>

            <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
              {user.telephone1 && (
                <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 2px 0' }}>
                  <WhatsAppButton phoneNumber={user.telephone1} />
                  <Typography variant="body2" style={{ margin: '0 0 0 5px' }}>{user.telephone1}</Typography>
                </div>
              )}
              {user.telephone2 && (
                <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 2px 0' }}>
                  <PhoneNumber phoneNumber={user.telephone2} />
                  <Typography variant="body2" style={{ margin: '0 0 0 10px' }}>{user.telephone2}</Typography>
                </div>
              )}
              <Tooltip title={user.email} arrow>
                <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 2px 0' }}>
                  <IconButton component="a" href={`mailto:${user.email}`} size="extra-small" color="primary" style={{ margin: '0 1px 0 0' }}>
                    <EmailOutlinedIcon fontSize="small" />
                  </IconButton>
                    <Typography style={{fontSize: "11px"}} variant="body2">{user.email}</Typography>
                </div>
              </Tooltip>
            </div>



          </Card>
        </Grid>
      </Grid>

      <div>
        {/* UPDATE HOUSING BUTTON */}

        {housingData.user._id === profile._id &&
          <Link to={`/updatehousing/${_id}`} state={{ housingData }}>
            <Box sx={{ position: 'fixed', right: '90px', bottom: '20px', zIndex: '9999' }}>
              <Fab color="secondary" aria-label="edit">
                 <EditIcon />
              </Fab>
            </Box>
          </Link>}

          {/* DELETE HOUSING ICON */}

      {housingData.user._id === profile._id &&
            <Box sx={{ position: 'fixed', right: '160px', bottom: '20px', zIndex: '9999' }}>
              <Fab color="error" aria-label="eliminar propiedad">
                <DeleteIcon onClick={() => handleDeleteHousing(_id)}/>
              </Fab>
            </Box>}

            {/* Botón para volver a la ventana de navegación anterior */}

        <Box sx={{ position: 'fixed', right: '20px', bottom: '20px', zIndex: '9999' }}>
            <Fab color="action" aria-label="regresar">
              {/* <IconButton aria-label="Volver" onClick={() => history.goBack()}> */}
              <IconButton aria-label="Volver" onClick={() => (navigate(`/mainview`))}>
                <ChevronLeftIcon />
              </IconButton>
            </Fab>
          </Box>

      </div>
    </div>
  );

} 