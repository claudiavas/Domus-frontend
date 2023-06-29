import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Grid, Typography, TextField, Input } from '@mui/material/';
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

export const HousingDetails = () => {

  const navigate = useNavigate()
  const { _id } = useParams(); // Obtener el parámetro de la URL
  const [housingData, setHousingData] = useState({});

  const fetchHouse = async () => {
    try {
      const response = await getHouse(_id);
      setHousingData(response);
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHouse()
  }, [_id]);


  if (!housingData) {
    return <div>Loading...</div>;
  }

  // MODO DE EDICIÓN

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    realEstate: 'realEstate1', // TODO: HACER QUE MUESTRE EL VALOR DE LA INMOBILIARIA DEL USUARIO EN VEZ DE realEstate1
    country: 'España',
    description: housingData.description,
    });

  const handleFieldChange = (fieldName, e) => {
    const newFormData = e.target.value !== undefined ? e.target.value : ''; // Verificar si es undefined
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: newFormData,
    }));
    console.log("formData en handleFieldChange", formData)
  };

  // const handlePermanentDelete = async (_id) => {
  //   await permanentDelete(_id);
  //   await tasksGetter();
  // }

  
  const editPopup = async () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      await updateHousing(_id, formData);
      //await getActiveHousing();
      setEditMode(false);
    }
    }


    const handleDeleteHousing = async (_id, status) => {
      updateHousing(_id, { status: "DELETED" });
      await setFormData((prevState) => ({
        ...prevState,
        status: "DELETED",
      }));
      alert("Vivienda eliminada correctamente")
      navigate("/mainview");
  }

  // PENDIENTE DE IMPLEMENTACIÓN Y VER DÓNDE IRÍA EL BOTÓN  
  // const handlePermanentDelete = async (_id) => {
  //     await permanentDelete(_id);
  //     await getActiveHousing();
  //   }


  return (

    //  HEADING

    <div style={{ margin: '0 3rem 3rem 3rem' }}>
      <h1 style={{ marginTop: 0, background: '#1976d2', color: 'white', padding: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <span>Detalle del Inmueble</span>
        <IconButton color="inherit" aria-label="eliminar">
          <DeleteIcon onClick={() => (handleDeleteHousing(_id))}/>
        </IconButton>
      </h1>


    <PhotoGallery />

    <IconButton onClick={editPopup} aria-label="Editar" size="small">
          <EditIcon titleAccess="editar"/>
    </IconButton>
    
    <Grid container spacing={3}>
      <Grid item xs={8} style={{ gridColumn: '1 / span 8' }}>
    
       <Paper elevation={3} style={{  padding: '1rem', marginBottom: '0.6rem'}}>
         {/* Datos del inmueble */}

         {!editMode ? 
              housingData.description && <Typography variant="h6">{housingData.description}</Typography> :
                <Input
                name="description"
                label="Descripción"
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e)}
              />
         }

         <br></br>
         <Typography variant="h6">Características</Typography>         
        
          {housingData.type && <Typography>Tipo de inmueble: {housingData.type}</Typography>}
          {housingData.transaction && <Typography>Transacción: {housingData.transaction}</Typography>}
          {housingData.currency && <Typography>Moneda: {housingData.currency}</Typography>}
          {housingData.price && <Typography>Precio: {housingData.price}</Typography>}
          {housingData.squareMeters && <Typography>Metros cuadrados: {housingData.squareMeters}</Typography>}
          {housingData.country && <Typography>País: {housingData.country}</Typography>}
          {/* {housingData.province && <Typography>Provincia: {housingData.province}</Typography>} */}
          {/* {housingData.municipality && <Typography>Municipalidad: {housingData.municipality}</Typography>} */}
          {/* {housingData.neighborhood && <Typography>Barrio: {housingData.neighborhood}</Typography>} */}
          {/* {housingData.zipCode && <Typography>Código Postal: {housingData.zipCode}</Typography>} */}
          {/* {housingData.roadName && <Typography>Vía: {housingData.roadName}</Typography>} */}
          {housingData.houseNumber && <Typography>Número de portal: {housingData.houseNumber}</Typography>}
          {housingData.floor && <Typography>Piso: {housingData.floor}</Typography>}
          {housingData.door && <Typography>Puerta: {housingData.door}</Typography>}
          {housingData.stair && <Typography>Escalera: {housingData.stair}</Typography>}
          {housingData.rooms && <Typography>Dormitorios: {housingData.rooms}</Typography>}
          {housingData.baths && <Typography>Baños: {housingData.baths}</Typography>}
          {housingData.garage && <Typography>Garages: {housingData.garage}</Typography>}
          {housingData.floorLevel && <Typography>Nivel de piso: {housingData.floorLevel}</Typography>}
          {housingData.facing && <Typography>Orientación: {housingData.facing}</Typography>}
          {housingData.propertyAge && <Typography>Antigüedad del inmueble: {housingData.propertyAge}</Typography>}
          {housingData.condition && <Typography>Condición: {housingData.condition}</Typography>}
          {housingData.furnished && <Typography>Amueblado: {housingData.furnished}</Typography>}
          {housingData.kitchenEquipment && <Typography>Equipamiento de cocina: {housingData.kitchenEquipment}</Typography>}
          {housingData.airConditioned && <Typography>Aire acondicionado: {housingData.airConditioned}</Typography>}
          {housingData.heating && <Typography>Calefacción: {housingData.heating}</Typography>}
          {housingData.elevator && <Typography>Ascensor: {housingData.elevator}</Typography>}
          {housingData.storage && <Typography>Trastero: {housingData.storage}</Typography>}
          {housingData.outsideview && <Typography>Vista Exterior: {housingData.outsideview}</Typography>}
          {housingData.garden && <Typography>Jardín: {housingData.garden}</Typography>}
          {housingData.pool && <Typography>Piscina: {housingData.pool}</Typography>}
          {housingData.terrace && <Typography>Terraza: {housingData.terrace}</Typography>}
          {housingData.closets && <Typography>Closets: {housingData.closets}</Typography>}
          {housingData.accessible && <Typography>Accesible: {housingData.accessible}</Typography>}
        </Paper> 
      </Grid>

     
      <Grid item xs={4} style={{ gridColumn: '9 / span 4' }}>
        
        <Paper
          elevation={3}
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'white',
            padding: '1rem', 
            marginBottom: '0.6rem'
          }}>

          {/* Datos de la inmobiliaria */}
          <p>DATOS DE LA INMOBILIARIA</p>
          <br/>
          <br/>
          <br/>
          {/* Datos del usuario */}
          <p>DATOS DEL USUARIO</p>
       
        </Paper>
      </Grid>
     

    </Grid>

    <Link to={`/updatehousing/${_id}`} state={{ housingData }}>
      <Box sx={{  position: 'fixed', right: '20px', bottom: '20px', zIndex: '9999' }}>
        <Fab 
          color="secondary"
          aria-label="edit">
          <EditIcon />
        </Fab>
      </Box>
    </Link>
  
  </div>
  );
};
