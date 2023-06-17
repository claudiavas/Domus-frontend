import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { LocationContext } from '../../Contexts/LocationContext'
import { HousingContext } from '../../Contexts/HousingContext'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Paper, Grid, RadioGroup, Radio } from '@mui/material/';
//import { useForm } from 'react-hook-form';
//import * as Yup from 'yup';

export const AddHousing = () => {

  const { provinces } = useContext(LocationContext);
  const { housing } = useContext(HousingContext);

console.log("Este es provinces en AddHousing", provinces);

  const [municipalities, setMunicipalities] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [errors, setErrors] = useState({});
  
  
  const [formData, setFormData] = useState({
    realEstate: '',
    type: '',
    transaction: '',
    currency: '',
    price: '',
    squareMeters: '',
    description: '',
    country: 'España',
    community: '',
    province: '',
    municipality: '',
    population: '',
    neighborhood: '',
    zipCode: '',
    roadType: '',
    roadName: '',
    houseNumber: '',
    floorLevel: '',
    floorNumber: '',
    door: '',
    stair: '',
    facing: '',
    propertyAge: '',
    rooms: '',
    baths: '',
    garages: '',
    condition: '',
    furnished: '',
    kitchenEquipment: '',
    closets: false,
    airConditioned: false,
    heating: false,
    elevator: false,
    outsideView: false,
    garden: false,
    pool: false,
    terrace: false,
    storage: false,
    accessible: false,
    });


  // VALIDACIONES

  // const validationSchema = Yup.object().shape({
  //   realEstate: Yup.string().required('Por favor, selecciona una inmobiliaria'),
  //   type: Yup.string().required('Por favor, selecciona un tipo de inmueble'),
  //   transaction: Yup.string().required('Por favor, selecciona un tipo de transacción'),
  //   currency: Yup.string().required('Por favor, selecciona una moneda'),
  //   price: Yup.number().required('Por favor, ingresa un precio').positive('El precio debe ser un valor positivo'),
  //   squareMeters: Yup.number().required('Por favor, ingresa los metros cuadrados').positive('Los metros cuadrados deben ser un valor positivo'),
  //   description: Yup.string(),
  //   country: Yup.string().required('Por favor, ingresa el país'),
  //   province: Yup.string().required('Por favor, selecciona una provincia'),
  //   municipality: Yup.string().required('Por favor, selecciona un municipio'),
  //   population: Yup.string().required('Por favor, ingresa la población'),
  //   neighborhood: Yup.string().required('Por favor, ingresa el barrio'),
  //   zipCode: Yup.string(),
  //   roadType: Yup.string(),
  //   roadName: Yup.string(),
  //   houseNumber: Yup.string(),
  //   floorNumber: Yup.string(),
  //   door: Yup.string(),
  //   stair: Yup.string(),
  //   rooms: Yup.number().required('Por favor, ingresa el número de habitaciones').integer('El número de habitaciones debe ser un valor entero').positive('El número de habitaciones debe ser un valor positivo'),
  //   baths: Yup.number().integer('El número de baños debe ser un valor entero').positive('El número de baños debe ser un valor positivo'),
  //   garages: Yup.number().integer('El número de garajes debe ser un valor entero').positive('El número de garajes debe ser un valor positivo'),
  //   floorLevel: Yup.string(),
  //   facing: Yup.string(),
  //   propertyAge: Yup.string(),
  //   condition: Yup.string(),
  //   furnished: Yup.string(),
  //   kitchenEquipment: Yup.string(),
  // });

  const handleSubmit = async (event) => {
    event.preventDefault();        
    // Lógica para enviar el formulario al servidor
    try {
      await validationSchema.validate(formData, { abortEarly: false });
     axios.post('URL_DEL_ENDPOINT', formData)
       .then((response) => {
         // Aquí puedes realizar acciones adicionales después de enviar el formulario,
         // como mostrar una notificación de éxito o redireccionar a otra página.
         console.log(response.data);
       })
       .catch((error) => {
         // Manejo de errores en caso de que falle el envío del formulario
         console.error(error);
       });
    
     setHousing([...housing, formData]); // Actualizar el estado de housing en el contexto
      // Si la validación es exitosa, puedes continuar con el envío del formulario
      // ...
    } catch (error) {
      // Si la validación falla, puedes obtener los errores y mostrarlos en tu interfaz
      const validationErrors = {};
  
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
  
      setErrors(validationErrors);
    }
  };

    const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      const fieldValue = type === 'checkbox' ? checked : value;
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: fieldValue,
      }));
    };

    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
    };
 
    const handleProvinceChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedProvince(selectedValue);
      console.log("Esta es la provincia seleccionada:", selectedValue);
      setFormData((prevFormData) => ({
        ...prevFormData,
        province: selectedValue.PRO,
      }));
    };

    const handleMunicipalityChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedMunicipality(selectedValue);
      console.log("esta es la municipalidad seleccionada", selectedValue);
      setFormData((prevFormData) => ({
        ...prevFormData,
        municipality: selectedValue.DMUN50,
      }));
    };

    const fetchMunicipalities = async () => {
      try {
        console.log("selectedProvince en fetchMunicipalities:", selectedProvince);
        const { data } = await axios.get(`https://apiv1.geoapi.es/municipios?CPRO=${selectedProvince.CPRO}&type=JSON&key=eb280e481fbc76bc3be11e0e4b108687b76439c4d70beb2fbab3d7e56d772760&sandbox=0`);
        console.log("Data en getMunicipalities:", data);
        setMunicipalities(data.data);
        console.log("Data en fetchMunicipalities:", data);
      } catch (error) {
        console.error(error);
      }
    };

   useEffect(() => {
    fetchMunicipalities()
      .then(() => {
        console.log(municipalities);
      });
  }, [selectedProvince]);



    return (

//  HEADING

      <div style={{ margin: '0 3rem 3rem 3rem' }}>
        <h1 style={{ marginTop: 0, background: '#1976d2', color: 'white', padding: '0.5rem' }}>Añadir Propiedad</h1>
  
        <form onSubmit={handleSubmit}>
          
{/* TRANSACTION */}

        <Paper elevation={3} style={{ padding: '1rem', marginBottom: '0.6rem'}}>
          <Grid container spacing={1}>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <FormControl style={{ width: '75%' }}>
                <InputLabel id="realEstate-label">Inmobiliaria*</InputLabel>
                <Select
                  name="realEstate"
                  value={formData.realEstate}
                  onChange={handleChange}
                  //error={!!errors.realEstate}
                  labelId="realEstate-label"
                >
                  // TODO: HACER QUE MUESTRE EL VALOR DE LA INMOBILIARIA DEL USUARIO EN VEZ DE realEstate1
                  <MenuItem value="realEstate1">Real Estate 1</MenuItem> 
                  <MenuItem value="Independiente">Publicación independiente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <FormControl style={{ width: '75%' }}> 
                <InputLabel id="type-label">Tipo de inmueble*</InputLabel>
                <Select
                  name="type"
                  label="Tipo"
                  value={formData.type}
                  onChange={handleChange}
                  //error={!!errors.type}
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
                  label="Tipo de Transacción"
                  value={formData.transaction}
                  onChange={handleChange}
                  //error={!!errors.transaction}
                  labelId="transaction-label"
                >
                  <MenuItem value="sell">Venta</MenuItem> 
                  <MenuItem value="buy">Compra</MenuItem>
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
                //error={!!errors.currency}
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
              //error={!!errors.price}
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
                  //error={!!errors.squareMeters}
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
              //error={!!errors.description}
            />
            </FormControl>
            </Grid>

          </Grid>
        </Paper>
        
{/* LOCATION */}

        <Paper elevation={3} style={{ padding: '1rem', marginBottom: '0.6rem'}}>
          <Grid container spacing={1}>

            <Grid item xs={12} sm={6} md={4} lg={4}>
            <FormControl style={{ width: '75%' }}> 
              <TextField
              name="country"
              label="País*"
              value={formData.country}
              onChange={handleChange}
              //error={!!errors.country}
            />
            </FormControl>
             </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <FormControl style={{ width: '75%' }}>
                <InputLabel id="province-label">Provincia*</InputLabel>
                <Select
                  labelId="province-label"
                  name="province"
                  value={event.target.value}
                  onChange={handleProvinceChange}
                  //error={!!errors.province}
                >
                  
                  {provinces.map((province) => (
                    <MenuItem key={province.CPRO} value={province}>
                      {province.PRO}
                    </MenuItem>
                  ))}
                 
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid item xs={12} sm={6} md={4} lg={4}>
              <FormControl style={{ width: '75%' }}>
                <InputLabel id="municipality-label">Municipio*</InputLabel>
                <Select
                  labelId="municipality-label"
                  name="municipality"
                  value={selectedMunicipality}
                  onChange={handleMunicipalityChange}
                  //error={!!errors.municipality}
                >
                  
                {municipalities.map((municipality) => (
                    <MenuItem key={municipality.CMUM} value={municipality}>
                      {municipality.DMUN50}
                    </MenuItem>
                  ))}
                 
                </Select>
              </FormControl>
            </Grid> */}

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <FormControl style={{ width: '75%' }}>
            <TextField
              name="population"
              label="Población*"
              value={formData.population}
              onChange={handleChange}
              //error={!!errors.population}
              disabled={!formData.municipality}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <FormControl style={{ width: '75%' }}>
            <TextField
              name="neighborhood"
              label="Barrio*"
              value={formData.neighborhood}
              onChange={handleChange}
              //error={!!errors.neighborhood} 
              disabled={!formData.population}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <FormControl style={{ width: '75%' }}>
            <TextField
              name="zipCode"
              label="Código Postal"
              value={formData.zipCode}
              onChange={handleChange}
              //error={!!errors.zipCode}
              disabled={!formData.neighborhood}
            />
          </FormControl>
        </Grid>

          </Grid>
        </Paper>
    
{/* ADDRESS */}

        <Paper elevation={3} style={{ padding: '1rem', marginBottom: '0.6rem'}}>
          <Grid container spacing={1}>

            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
              <InputLabel id="roadType-label">Tipo de Vía</InputLabel>
              
      
            <Select
                name="roadType"
                value={formData.roadType}
                onChange={handleChange}
                //error={!!errors.roadType}
                labelId="roadType-label"
              >
                <MenuItem value="roadType1">Tipo de Vía 1</MenuItem>
                <MenuItem value="roadType2">Tipo de Vía 2</MenuItem>
                {/* Agrega más opciones aquí */}
              </Select>
            </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
             <TextField
              name="roadName"
              label="Nombre de Vía"
              value={formData.roadName}
              onChange={handleChange}
              //error={!!errors.roadName}
            />
            </FormControl>
            </Grid>

      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
            <TextField
              name="houseNumber"
              label="Número de Casa"
              value={formData.houseNumber}
              onChange={handleChange}
              //error={!!errors.houseNumber}
            />
            </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
            <TextField
              name="floorNumber"
              label="Número de Piso"
              value={formData.floorNumber}
              onChange={handleChange}
              //error={!!errors.floorNumber}
            />
            </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
            <TextField
              name="door"
              label="Puerta"
              value={formData.door}
              onChange={handleChange}
              //error={!!errors.door}
            />
            </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
            <TextField
              name="stair"
              label="Escalera"
              value={formData.stair}
              onChange={handleChange}
              //error={!!errors.stair}
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
              //error={!!errors.rooms}
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
              //error={!!errors.baths}
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
              //error={!!errors.garages}
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
                //error={!!errors.floorLevel}
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
            <TextField
              name="facing"
              label="Orientación"
              value={formData.facing}
              onChange={handleChange}
              //error={!!errors.facing}
            />
            </FormControl>
            </Grid>

      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
            <TextField
              name="propertyAge"
              label="Antigüedad de la Propiedad"
              value={formData.propertyAge}
              onChange={handleChange}
              //error={!!errors.propertyAge}
            />
            </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl style={{ width: '75%' }}> 
              <InputLabel id="condition-label">Estado</InputLabel>
              <Select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                //error={!!errors.condition}
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
                //error={!!errors.furnished}
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
                //error={!!errors.kitchenEquipment}
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

            
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControlLabel style={{ width: '75%' }}
                control={
                <Checkbox
                  name="airConditioned"
                  checked={formData.airConditioned}
                  onChange={handleCheckboxChange}
                />
              }
              label="Aire Acondicionado"
            />
            </Grid>

      
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControlLabel style={{ width: '75%' }}
              control={
                <Checkbox
                  name="heating"
                  checked={formData.heating}
                  onChange={handleCheckboxChange}
                />
              }
              label="Calefacción"
            />
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControlLabel style={{ width: '75%' }}
              control={
                <Checkbox
                  name="elevator"
                  checked={formData.elevator}
                  onChange={handleCheckboxChange}
                />
              }
              label="Ascensor"
            />
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="storage"
                  checked={formData.storage}
                  onChange={handleCheckboxChange}
                />
              }
              label="Trastero"
            />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControlLabel style={{ width: '75%' }}
              control={
                <Checkbox
                  name="outsideView"
                  checked={formData.outsideView}
                  onChange={handleCheckboxChange}
                />
              }
              label="Vistas al Exterior"
            />
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="garden"
                  checked={formData.garden}
                  onChange={handleCheckboxChange}
                />
              }
              label="Jardín"
            />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="pool"
                  checked={formData.pool}
                  onChange={handleCheckboxChange}
                />
              }
              label="Piscina"
            />
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="terrace"
                  checked={formData.terrace}
                  onChange={handleCheckboxChange}
                />
              }
              label="Terraza"
            />
            </Grid>


            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControlLabel style={{ width: '75%' }}
              control={
                <Checkbox
                  name="closets"
                  checked={formData.closets}
                  onChange={handleCheckboxChange}
                />
              }
              label="Armarios Empotrados"
            />
            </Grid>
      
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="accessible"
                  checked={formData.accessible}
                  onChange={handleCheckboxChange}
                />
              }
              label="Accesible"
            />
            </Grid>

            </Grid>
            </Paper>
      
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>

      <Button variant="contained" color="primary" type="submit">
        Enviar
      </Button>

    </div>
    </div>
        </form>
      </div>
    )
}