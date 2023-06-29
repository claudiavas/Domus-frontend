import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { LocationContext } from '../../Contexts/LocationContext';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Paper, Grid, Switch } from '@mui/material/';
import { updateHousing } from '../../apiService/apiService';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

//import { useForm } from 'react-hook-form';
//import { yupResolver } from '@hookform/resolvers/yup';
//import * as Yup from 'yup';

export const UpdateHousing = () => {

  const navigate = useNavigate()
  const { _id } = useParams(); // Obtener el parámetro de la URL
  const location = useLocation();
  const { housingData } = location.state;

  const { provinces } = useContext(LocationContext);

  const [municipalities, setMunicipalities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [roads, setRoads] = useState([]);

  const [selectedMunicipality, setSelectedMunicipality] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState([]);
  const [selectedZipCode, setSelectedZipCode] = useState([]);
    
  const [formData, setFormData] = useState({
    realEstate: housingData.realEstate,
    user: housingData.user,
    type: housingData.type,
    transaction: housingData.transaction,
    country: housingData.country,
    province: housingData.province,
    municipality: housingData.municipality,
    neighborhood: housingData.neighborhood,
    zipCode: housingData.zipCode,
    squareMeters: housingData.squareMeters,
    currency: housingData.currency,
    price: housingData.price,
    roadName: housingData.roadName,
    houseNumber: housingData.houseNumber,
    floorLevel: housingData.floorLevel,
    floorNumber: housingData.floorNumber,
    door: housingData.door,
    stair: housingData.stair,
    facing: housingData.facing,
    propertyAge: housingData.propertyAge,
    description: housingData.description,
    rooms: housingData.rooms,
    baths: housingData.baths,
    garages: housingData.garages,
    condition: housingData.condition,
    furnished: housingData.furnished,
    kitchenEquipment: housingData.kitchenEquipment,
    closets: housingData.closets,
    airConditioned: housingData.airConditioned,
    heating: housingData.heating,
    elevator: housingData.elevator,
    outsideView: housingData.outsideView,
    garden: housingData.garden,
    pool: housingData.pool,
    terrace: housingData.terrace,
    storage: housingData.storage,
    accessible: housingData.accessible,
    status: housingData.status,
    isdeleted: housingData.isdeleted,
    deletedAt: housingData.deletedAt
    });


  useEffect(() => {
    console.log("housingData en useEffect", housingData)
  }, [housingData]);


  // VALIDACIONES

  // const validationSchema = Yup.object().shape({
  //   type: Yup.string().required('Por favor, selecciona un tipo de inmueble'),
  //   transaction: Yup.string().required('Por favor, selecciona un tipo de transacción'),
  //   currency: Yup.string().required('Por favor, selecciona una moneda'),
  //   price: Yup.number().required('Por favor, ingresa un precio').positive('El precio debe ser un valor positivo'),
  //   squareMeters: Yup.number().required('Por favor, ingresa los metros cuadrados').positive('Los metros cuadrados deben ser un valor positivo'),
  //   description: Yup.string().optional(),
  //   country: Yup.string().required('Por favor, ingresa el país'),
  //   province: Yup.mixed().required('Por favor, selecciona una provincia'),
  //   municipality: Yup.mixed().required('Por favor, selecciona un municipio'),
  //   neighborhood: Yup.mixed().required('Por favor, ingresa el barrio'),
  //   rooms: Yup.number().required('Por favor, ingresa el número de habitaciones').integer('El número de habitaciones debe ser un valor entero').positive('El número de habitaciones debe ser un valor positivo'),
  //   baths: Yup.number()
  //   .integer('El número de baños debe ser un valor entero')
  //   .min(0, 'El número de baños debe ser un valor positivo')
  //   .nullable()
  //   .default(null)
  //   .optional(),
  //   garages: Yup.number()
  //   .integer('El número de baños debe ser un valor entero')
  //   .min(0, 'El número de baños debe ser un valor positivo')
  //   .nullable()
  //   .default(null)
  //   .optional(),
  //   });


  // const { handleSubmit, setError, formState: { errors } } = useForm({
  //     resolver: yupResolver(validationSchema)
  //   });

  const handleSubmit = async (event) => {
    event.preventDefault();     
    console.log(formData, formData)
    // Borrar los errores previos antes de la validación
    // clearErrors();   
    try {
      // await validationSchema.validate(formData, { abortEarly: false });
      const response = await updateHousing(_id, formData);
      console.log(formData, formData)
      setHousing([...housing, formData]); // Actualizar el estado de housing en el contexto
    } catch(error) {
      console.error(error);
    }
  };
    
  //   } catch (error) {
  //     error.inner.forEach((err) => {
  //       setError(err.path, {
  //         type: 'manual',
  //         message: err.message
  //       });
  //     })
  //   }
  // };

    const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      const fieldValue = type === 'checkbox' ? checked : value;
    
      switch (name) {
        case 'province':
          setSelectedProvince(value);
          break;
        case 'municipality':
          setSelectedMunicipality(value);
          break;
        case 'neighborhood':
          setSelectedNeighborhood(value);
          break;
        case 'zipCode':
          setSelectedZipCode(value);
          break;
      }
      
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: fieldValue,
      }));
    };
    
    
  const fetchMunicipalities = async () => {
      try {
        const { data } = await axios.get(`https://apiv1.geoapi.es/municipios?CPRO=${selectedProvince.CPRO}&type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0`);
        setMunicipalities(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchNeighborhoods = async () => {
      try {
        const { data } = await axios.get(`https://apiv1.geoapi.es/nucleos?CPRO=${selectedProvince.CPRO}&CMUM=${selectedMunicipality.CMUM}&NENTSI50=${selectedMunicipality.DMUN50}&type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0`);
        setNeighborhoods(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchZipCodes = async () => {
      try {
        const { data } = await axios.get(`https://apiv1.geoapi.es/cps?CPRO=${selectedProvince.CPRO}&CMUM=${selectedMunicipality.CMUM}&CUN=${selectedNeighborhood.CUN}&type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0`);  
        setZipCodes(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRoads = async () => {
      try {
        const { data } = await axios.get(`https://apiv1.geoapi.es/calles?CPRO=${selectedProvince.CPRO}&CMUM=${selectedMunicipality.CMUM}&CUN=${selectedNeighborhood.CUN}&CPOS=${selectedZipCode.CPOS}&type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0`);  
        setRoads(data.data);
      } catch (error) {
        console.error(error);
      }
    };

   useEffect(() => {
    if (selectedProvince) {
      fetchMunicipalities();
    }
  }, [selectedProvince]);

    useEffect(() => {
      if (selectedMunicipality) {
        fetchNeighborhoods();
      }
    }, [selectedMunicipality]);

    useEffect(() => {
      if (selectedNeighborhood) {
        fetchZipCodes();
      }
    }, [selectedNeighborhood]);

    useEffect(() => {
      if (selectedZipCode) {
        fetchRoads();
      }
    }, [selectedZipCode]);

    return (

//  HEADING

      <div style={{ margin: '0 3rem 3rem 3rem' }}>
        <h1 style={{ marginTop: 0, background: '#1976d2', color: 'white', padding: '0.5rem' }}>Editar Propiedad</h1>

        <form onSubmit={handleSubmit}>
          
{/* TRANSACTION */}

        <Paper elevation={3} style={{ padding: '1rem', marginBottom: '0.6rem'}}>
          <Grid container spacing={1}>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              {/* <FormControl style={{ width: '75%' }}>
                <InputLabel id="realEstate-label">Inmobiliaria*</InputLabel>
                <Select
                  name="realEstate"
                  value={formData.realEstate}
                  onChange={handleChange}
                  labelId="realEstate-label"
                >
                  // TODO: HACER QUE MUESTRE EL VALOR DE LA INMOBILIARIA DEL USUARIO EN VEZ DE realEstate1
                  <MenuItem value="realEstate1">Real Estate 1</MenuItem> 
                  <MenuItem value="independent_agent">Agente independiente</MenuItem>
                </Select>
              </FormControl> */}
            </Grid>
            
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <FormControl style={{ width: '75%' }}> 
                <InputLabel id="type-label">Tipo de inmueble*</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  // error={!!errors.type}
                  // helpertext={errors.type}
  
                  labelId="type-label"
                >
                  <MenuItem value="apartment">Piso</MenuItem> 
                  <MenuItem value="penthouse">Ático</MenuItem>
                  <MenuItem value="duplex">Duplex</MenuItem>
                  <MenuItem value="house">Casa</MenuItem>
                  <MenuItem value="chalet">Chalet</MenuItem>
                  <MenuItem value="other">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
           
            <Grid item xs={12} sm={6} md={4} lg={3} >
              <FormControl style={{ width: '75%' }}>
                <InputLabel id="transaction-label">Tipo de transacción*</InputLabel>
                <Select
                  name="transaction"
                  value={formData.transaction}
                  onChange={handleChange}
                  // error={!!errors.transaction}
                  // helpertext={errors.transaction}
                  labelId="transaction-label"
                >
                  <MenuItem value="sell">Venta</MenuItem> 
                  <MenuItem value="rent">Alquiler</MenuItem>
                  <MenuItem value="vacation_rentals">Alquiler Vacacional</MenuItem>
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Button 
                style={{ gridRow: "4 / span 3", justifySelf: 'center', verticalAlign: 'center', width: '75%' }}
                variant="outlined" 
                color="primary"
              >
                Cargar Imágenes
              </Button>
            </Grid>

             <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControl style={{ width: '75%' }}> 
             <InputLabel id="currency-label">Moneda*</InputLabel>
              <Select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                // error={!!errors.currency}
                // helpertext={errors.currency}
                labelId="currency-label"
              >
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="DOL">DOL</MenuItem>
              </Select>
            </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControl style={{ width: '75%' }}> 
            <TextField
              name="price"
              label="Precio*"
              value={formData.price}
              onChange={handleChange}
              // error={!!errors.price}
              // helpertext={errors.price}
            />
            </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControl style={{ width: '75%' }}> 
                 <TextField
                  name="squareMeters"
                  label="Metros Cuadrados*"
                  value={formData.squareMeters}
                  onChange={handleChange}
                  // error={!!errors.squareMeters}
                  // helpertext={errors.squareMeters}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={9}>
            <FormControl style={{ width: '92%' }}> 
            <TextField
              name="description"
              label="Descripción"
              value={formData.description}
              onChange={handleChange}
            />
            </FormControl>
            </Grid>

          </Grid>
        </Paper>
        
{/* LOCATION */}

        <Paper elevation={3} style={{ padding: '1rem', marginBottom: '0.6rem'}}>
          <Grid container spacing={1}>

            <Grid item xs={12} sm={6} md={4} lg={4}>
            <FormControl style={{ width: '90%' }}> 
              <TextField
              name="country"
              label="País*"
              value={formData.country}
              onChange={handleChange}
              // error={!!errors.country}
              // helpertext={errors.country}
            />
            </FormControl>
             </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <FormControl style={{ width: '90%' }}>
                <InputLabel id="province-label">Provincia*</InputLabel>
                <Select
                  labelId="province-label"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  // error={!!errors.province}
                  // helpertext={errors.province}
                >
                  
                  {provinces.map((province) => (
                    <MenuItem key={province.CPRO} value={province}>
                      {province.PRO}
                    </MenuItem>
                  ))}
                 
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <FormControl style={{ width: '90%' }}>
                <InputLabel id="municipality-label">Municipio*</InputLabel>
                <Select
                  labelId="municipality-label"
                  name="municipality"
                  value={formData.municipality}
                  onChange={handleChange}
                  // error={!!errors.municipality}
                  // helpertext={errors.municipality}
                >
                  
                {municipalities.map((municipality) => (
                  <MenuItem key={municipality.CMUM} value={municipality}>
                    {municipality.DMUN50}
                  </MenuItem>
                ))}
                 
                </Select>
              </FormControl>
            </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <FormControl style={{ width: '90%' }}>
          <InputLabel id="neighborhood-label">Barrio*</InputLabel>
              <Select
                labelId="neighborhood-label*"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                // error={!!errors.neighborhood} 
                // helpertext={errors.neighborhood}
            >
          
            {neighborhoods.map((neighborhood) => (
              <MenuItem key={neighborhood.CUN} value={neighborhood}>
                {neighborhood.NNUCLE50}
              </MenuItem>
            ))}

              </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <FormControl style={{ width: '90%' }}>
            <InputLabel id="zipCode-label">Código Postal</InputLabel>
              <Select
              labelId="zipCode-label"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              // error={!!errors.zipCode}
              // helpertext={errors.zipCode}
             >

            {zipCodes.map((zipCode) => (
              <MenuItem key={zipCode.CPOS} value={zipCode}>
                {zipCode.CPOS}
              </MenuItem>
            ))}

              </Select>
          </FormControl>
        </Grid>


            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '90%' }}> 
              <InputLabel id="roadName-label">Vía</InputLabel>
              
                <Select
                labelId="roadName-label"
                name="roadName"
                value={formData.roadName}
                onChange={handleChange}
                // error={!!errors.roadName}
                // helpertext={errors.roadName}
              >
              {roads.map((road) => (
              <MenuItem key={road.NVIAC} value={road}>
                 {`${road.NVIAC} (${road.TVIA})`}
              </MenuItem>
            ))}
              </Select>
            </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControl style={{ width: '85%' }}> 
            <TextField
              name="houseNumber"
              label="Número de portal"
              value={formData.houseNumber}
              onChange={handleChange}
              // error={!!errors.houseNumber}
              // helpertext={errors.houseNumber}
            />
            </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControl style={{ width: '85%' }}> 
            <TextField
              name="floorNumber"
              label="Número de Piso"
              value={formData.floorNumber}
              onChange={handleChange}
              // error={!!errors.floorNumber}
              // helpertext={errors.floorNumber}
            />
            </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControl style={{ width: '85%' }}> 
            <TextField
              name="door"
              label="Puerta"
              value={formData.door}
              onChange={handleChange}
              // error={!!errors.door}
              // helpertext={errors.door}
            />
            </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControl style={{ width: '85%' }}> 
            <TextField
              name="stair"
              label="Escalera"
              value={formData.stair}
              onChange={handleChange}
              // error={!!errors.stair}
              // helpertext={errors.stair}
            />
            </FormControl>
            </Grid>

            </Grid>
            </Paper>

{/* CARACTERÍSTICAS PRINCIPALES */}

          <Paper elevation={3} style={{ padding: '1rem', marginBottom: '0.6rem'}}>
          <Grid container spacing={1}>

          <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
            <TextField
              name="rooms"
              label="Habitaciones*"
              value={formData.rooms}
              onChange={handleChange}
              // error={!!errors.rooms}
              // helpertext={errors.rooms}
            />
            </FormControl>
            </Grid>

      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
            <TextField
              name="baths"
              label="Baños"
              value={formData.baths}
              onChange={handleChange}
              // error={!!errors.baths}
              // helpertext={errors.baths}
            />
            </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
            <TextField
              name="garages"
              label="Garajes"
              value={formData.garages}
              onChange={handleChange}
              // error={!!errors.garages}
              // helpertext={errors.garages}
            />
            </FormControl>
            </Grid>
                
              
             <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
              <InputLabel id="floorLevel-label">Nivel del Piso</InputLabel>
              <Select
                name="floorLevel"
                value={formData.floorLevel}
                onChange={handleChange}
                labelId="floorLevel-label"
              >
                <MenuItem value="top_floor">Último Piso</MenuItem>
                <MenuItem value="intermediate_floor">Piso Intermedio</MenuItem>
                <MenuItem value="ground_floor">Planta Baja</MenuItem>
              </Select>
            </FormControl>
            </Grid>
      
            
      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
            <InputLabel id="facing-label">Orientación</InputLabel>
              <Select
              name="facing"
              labelId="facing-label"
              value={formData.facing}
              onChange={handleChange}
            >
              <MenuItem value="north">Norte</MenuItem>
              <MenuItem value="south">Sur</MenuItem>
              <MenuItem value="east">Este</MenuItem>
              <MenuItem value="west">Oeste</MenuItem>

              </Select>
            </FormControl>
            </Grid>

      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
            <InputLabel id="propertyAge-label">Antigüedad</InputLabel>
              <Select
              name="propertyAge"
              labelId="propertyAge-label"
              value={formData.propertyAge}
              onChange={handleChange}

            >
              <MenuItem value="new">Nuevo</MenuItem>
              <MenuItem value="up_to_5 years">Hasta 5 años</MenuItem>
              <MenuItem value="6_to_10 years">De 6 a 10 años</MenuItem>
              <MenuItem value="11_to_20 years">De 11 a 20 años</MenuItem>
              <MenuItem value="more_than_20 years">Más de 20 años</MenuItem>

              </Select>  
            </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
              <InputLabel id="condition-label">Estado</InputLabel>
              <Select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                labelId="condition-label"
              >
                <MenuItem value="new">Nuevo</MenuItem>
                <MenuItem value="good_condition">Buen Estado</MenuItem>
                <MenuItem value="to_renovate">Para Renovar</MenuItem>
              </Select>
            </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
              <InputLabel id="furnished-label">Amueblado</InputLabel>
              <Select
                name="furnished"
                value={formData.furnished}
                onChange={handleChange}
                labelId="furnished-label"
              >
                <MenuItem value="unfurnished">Sin Amueblar</MenuItem>
                <MenuItem value="semifurnished">Semi Amueblado</MenuItem>
                <MenuItem value="furnished">Amueblado</MenuItem>
              </Select>
            </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
              <InputLabel id="kitchenEquipment-label">Equipamiento de Cocina</InputLabel>
              <Select
                name="kitchenEquipment"
                value={formData.kitchenEquipment}
                onChange={handleChange}
                labelId="kitchenEquipment-label"
              >
                <MenuItem value="standard_equipment">Equipamiento Estándar</MenuItem>
                <MenuItem value="semi_equipped">Semi Equipado</MenuItem>
                <MenuItem value="fully_equipped">Completamente Equipado</MenuItem>
              </Select>
            </FormControl>
            </Grid>

            </Grid>
            </Paper>
      
{/* CARACTERÍSTICAS ADICIONALES */}

            <Paper elevation={3} style={{ padding: '1rem', marginBottom: '0.6rem'}}>
          <Grid container spacing={1}>

            
            <Grid item xs={12} sm={6} md={6} lg={2.4}>
            <FormControlLabel style={{ width: '100%' }}
                control={
                <Switch
                  name="airConditioned"
                  type="checkbox"
                  checked={formData.airConditioned}
                  onChange={handleChange}
                />
              }
              label="Aire Acondicionado"
            />
            </Grid>

      
            <Grid item xs={12} sm={6} md={6} lg={2.4}>
            <FormControlLabel style={{ width: '100%' }}
              control={
                <Switch
                  name="heating"
                  checked={formData.heating}
                  onChange={handleChange}
                />
              }
              label="Calefacción"
            />
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={2.4}>
            <FormControlLabel style={{ width: '100%' }}
              control={
                <Switch
                  name="elevator"
                  checked={formData.elevator}
                  onChange={handleChange}
                />
              }
              label="Ascensor"
            />
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={2.4}>
            <FormControlLabel style={{ width: '100%' }}
              control={
                <Switch
                  name="storage"
                  checked={formData.storage}
                  onChange={handleChange}
                />
              }
              label="Trastero"
            />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={2.4}>
            <FormControlLabel style={{ width: '100%' }}
              control={
                <Switch
                  name="outsideView"
                  checked={formData.outsideView}
                  onChange={handleChange}
                />
              }
              label="Vistas al Exterior"
            />
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={2.4}>
            <FormControlLabel style={{ width: '100%' }}
              control={
                <Switch
                  name="garden"
                  checked={formData.garden}
                  onChange={handleChange}
                />
              }
              label="Jardín"
            />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={2.4}>
            <FormControlLabel style={{ width: '100%' }}
              control={
                <Switch
                  name="pool"
                  checked={formData.pool}
                  onChange={handleChange}
                />
              }
              label="Piscina"
            />
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={2.4}>
            <FormControlLabel style={{ width: '100%' }}
              control={
                <Switch
                  name="terrace"
                  checked={formData.terrace}
                  onChange={handleChange}
                />
              }
              label="Terraza"
            />
            </Grid>


            <Grid item xs={12} sm={6} md={6} lg={2.4}>
            <FormControlLabel style={{ width: '100%' }}
              control={
                <Switch
                  name="closets"
                  checked={formData.closets}
                  onChange={handleChange}
                />
              }
              label="Armarios Empotrados"
            />
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={2.4}>
            <FormControlLabel style={{ width: '100%' }}
              control={
                <Switch
                  name="accessible"
                  checked={formData.accessible}
                  onChange={handleChange}
                />
              }
              label="Accesible"
            />
            </Grid>

            </Grid>
            </Paper>
      
{/* BOTÓN ENVIAR */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>

              <Button variant="contained" color="primary" type="submit">
                Enviar
              </Button>

            </div>
  
        </form>
      </div>
    )
}