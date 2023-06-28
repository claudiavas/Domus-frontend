import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import HousingContext from './HousingContext';

//Location
const listaInmuebles = [
    {
      provincia: 'Madrid',
      municipio: 'Vaciamadrid',

    },
    {
      provincia: 'Barcelona',
      municipio: 'Barcelona',

    },
    {
      provincia: 'Madrid',
      municipio: 'Getafe',

    },
    {
      provincia: 'Valencia',
      municipio: 'Lliria',

    },
    {
      provincia: 'Valencia',
      municipio: 'Benisano',

    },
  ];

  const locationsMunicipio = [
    {
      value: 'Lliria',
      label: 'Lliria',
    },
    {
      value: 'Benisano',
      label: 'Benisano',
    },
    {
      value: 'Villar del Arzobispo',
      label: 'Villar del Arzobispo',
    },
    
  ];
  const locationsProvince = [
    {
      value: 'Lliria',
      label: 'Lliria',
    },
    {
      value: 'Benisano',
      label: 'Benisano',
    },
    {
      value: 'Villar del Arzobispo',
      label: 'Villar del Arzobispo',
    },
    
  ];

  // export function LocationFilter() {
  //   return (
  //     <Box
  //       component="form"
  //       sx={{
  //         '& .MuiTextField-root': { m: 1, width: '25ch' },
  //       }}
  //       noValidate
  //       autoComplete="off"
  //     >
  //       <div>
  //         <TextField
  //           id="outlined-select-currency"
  //           select
  //           label="Provincia"
  //           defaultValue=" "
  //           //helperText="Selecciona un precio minimo"
  //         >
  //           {locationsProvince.map((option) => (
  //             <MenuItem key={option.value} value={option.value}>
  //               {option.label}
  //             </MenuItem>
  //           ))}
  //         </TextField>
  //         <TextField
  //           id="outlined-select-currency-native"
  //           select
  //           label="Población"
  //           defaultValue=" "
  //           SelectProps={{
  //             native: true,
  //           }}
  //           //helperText="Selecciona un precio maximo"
  //         >
  //           {locationsMunicipio.map((option) => (
  //             <option key={option.value} value={option.value}>
  //               {option.label}
  //             </option>
  //           ))}
  //         </TextField>
  //       </div>
  //     </Box>
  //   );
    
  // }
export function LocationFilter() {
  const [provincia, setProvincia] = useState('');
  const [municipio, setMunicipio] = useState('');

  const handleProvinciaChange = (event) => {
    setProvincia(event.target.value);
  };

  const handleMunicipioChange = (event) => {
    setMunicipio(event.target.value);
  };

  const handleFiltrarClick = () => {
    // Realizar la acción de filtrado o realizar la acción deseada con los valores seleccionados
    // Por ejemplo, puedes filtrar los datos o llamar a una función externa
    const filtro = {
      provincia: provincia,
      municipio: municipio,
    };

    // Llamar a una función externa pasando el filtro como argumento
    filtrarDatos(filtro);
  };

  const filtrarDatos = (filtro) => {
    // Aquí puedes realizar la lógica de filtrado con el filtro proporcionado
    // Por ejemplo, puedes filtrar un listado de inmuebles
    // y actualizar el estado con los datos filtrados

    // Ejemplo:
    const inmueblesFiltrados = listaInmuebles.filter((inmueble) => {
      if (filtro.provincia && filtro.municipio) {
        return (
          inmueble.provincia === filtro.provincia &&
          inmueble.municipio === filtro.municipio
        );
      } else if (filtro.provincia) {
        return inmueble.provincia === filtro.provincia;
      } else if (filtro.municipio) {
        return inmueble.municipio === filtro.municipio;
      } else {
        return true;
      }
    });

    // Actualizar el estado con los inmuebles filtrados
    setInmueblesFiltrados(inmueblesFiltrados);
  };

      return (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Provincia"
              value={provincia}
              onChange={handleProvinciaChange}
            >
              {locationsProvince.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
            </TextField>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Población"
              value={municipio}
              onChange={handleMunicipioChange}
              SelectProps={{
                native: true,
              }}
            >
              {locationsMunicipio.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
            </TextField>
            <Button variant="contained" onClick={handleFiltrarClick}>
              Filtrar
            </Button>
          </div>
        </Box>
      );
    }


//End Location


// Price filter

const currencies = [
  {
    value: '10000€',
    label: '10000€',
  },
  {
    value: '20000€',
    label: '20000€',
  },
  {
    value: '30000€',
    label: '30000€',
  },
  {
    value: '40000€',
    label: '40000€',
  },
  {
    value: '50000€',
    label: '50000€',
  },
  {
    value: '60000€',
    label: '60000€',
  },
];

export function PriceFilter() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Precio minimo"
          defaultValue="10000€"
          helperText="Selecciona un precio minimo"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Precio maximo"
          defaultValue="60000"
          SelectProps={{
            native: true,
          }}
          helperText="Selecciona un precio maximo"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </div>
    </Box>
  );

  
}

///// End Price filter
///// Start Square_meters filter

function meters(value = number) {
  return `${value}²`;
}

export function SquareMeters() {
  return (
    <Box sx={{ width: 200}}>
      <Slider
        aria-label="M²"
        defaultValue={60}
        getAriaValueText={meters}
        valueLabelDisplay="auto"
        step={10}
        marks={true}
        min={30}
        max={500}
      />
    </Box>
  );
}
///// End Square_meters filter
/// rooms filter
export function RoomFilter() {
  //const [room, setRoom] = React.useState('');
  const {room, setRoom} = useContext(HousingContext);


  const handleChange = (event) => {
    setRoom(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Habitaciones</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={room}
        label="Room"
        onChange={handleChange}
      >
        
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={11}>11</MenuItem>
        <MenuItem value={12}>12</MenuItem>
        <MenuItem value={13}>13</MenuItem>
        <MenuItem value={14}>14</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        
      </Select>
    </FormControl>
  );
}
/// end rooms filter



/// baths filter
export function BathFilter() {
  const [bath, setBath] = React.useState('');

  const handleChange = (event) => {
    setBath(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Baños</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={bath}
        label="Bath"
        onChange={handleChange}
      >
        
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
                
      </Select>
    </FormControl>
  );
}
/// end baths filter

/// garages filter
export function GaragesFilter() {
  const [garage, setGarage] = React.useState('');

  const handleChange = (event) => {
    setGarage(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Garaje</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={garage}
        label="Garage"
        onChange={handleChange}
      >
        
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
                
      </Select>
    </FormControl>
  );
}
/// end garages filter

/// checkbox filters
export function CheckboxesFilters() {
  const [state, setState] = React.useState({
    closet: false,
    air_condicioned: false,
    heating: false,
    elevator: false,
    outside_view: false,
    garden: false,
    pool: false,
    terrace: false,
    storage: false,
    accessible: false,
        
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { closet, air_condicioned, heating, elevator, outside_view, garden, pool, terrace, storage, accessible} = state;
  const error = [closet, air_condicioned, heating, elevator, outside_view, garden, pool, terrace, storage, accessible].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Equipamiento</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={closet} onChange={handleChange} name="closet" />
            }
            label="Armarios"
          />
          <FormControlLabel
            control={
              <Checkbox checked={air_condicioned} onChange={handleChange} name="air_condicioned" />
            }
            label="Aire acondicionado"
          />
          <FormControlLabel
            control={
              <Checkbox checked={heating} onChange={handleChange} name="heating" />
            }
            label="Calefacción"
          />
          <FormControlLabel
            control={
              <Checkbox checked={elevator} onChange={handleChange} name="elevator" />
            }
            label="Ascensor"
          />
          <FormControlLabel
            control={
              <Checkbox checked={outside_view} onChange={handleChange} name="outside_view" />
            }
            label="Vistas al exterior"
          />
          <FormControlLabel
            control={
              <Checkbox checked={garden} onChange={handleChange} name="garden" />
            }
            label="Jardín"
          />
          <FormControlLabel
            control={
              <Checkbox checked={pool} onChange={handleChange} name="pool" />
            }
            label="Piscina"
          />
          <FormControlLabel
            control={
              <Checkbox checked={terrace} onChange={handleChange} name="terrace" />
            }
            label="Terraza"
          />
          <FormControlLabel
            control={
              <Checkbox checked={storage} onChange={handleChange} name="storage" />
            }
            label="Trastero"
          />
           <FormControlLabel
            control={
              <Checkbox checked={accessible} onChange={handleChange} name="accessible" />
            }
            label="Accesible"
          />
        </FormGroup>
      </FormControl>
      
    </Box>
  );
}




/// end checkbox filters