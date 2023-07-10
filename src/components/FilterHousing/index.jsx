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
import HousingContext from './HousingContextFilter';

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

export function PriceFilterMin() {
  const { minPrice, setMinPrice} = useContext(HousingContext);
  

  const handleChangeMinPrice = (event) => {
    setMinPrice(event.target.value);
  };
  

  return (
<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Precio Minimo</InputLabel>
    <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={minPrice}
          label="Precio minimo"
          onChange={handleChangeMinPrice}
        >
          <MenuItem value={1000}>1000</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={20000}>20000</MenuItem>
          <MenuItem value={40000}>40000</MenuItem>
          <MenuItem value={150000}>150000</MenuItem>
          <MenuItem value={500000}>500000</MenuItem>
          
  </Select>
  </FormControl>
     
  );
  

}

export function PriceFilterMax() {
  const { maxPrice, setMaxPrice } = useContext(HousingContext);
  
  

  const handleChangeMaxPrice = (event) => {
    setMaxPrice(event.target.value);
  };

    
  return (
<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Precio Maximo</InputLabel>
    <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={maxPrice}
          label="Precio maximo"
          onChange={handleChangeMaxPrice}
        >
          <MenuItem value={1000}>1000</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={20000}>20000</MenuItem>
          <MenuItem value={40000}>40000</MenuItem>
          <MenuItem value={150000}>150000</MenuItem>
          <MenuItem value={500000}>500000</MenuItem>
          
  </Select>
  </FormControl>
     
  );
  
}

///// End Price filter
///// Start Square_meters filter

function meters(value) {
  return `${value}²`;
}

export function SquareMeters() {

  const { meter, setMeter } = useContext(HousingContext);
  const [filterValue, setFilterValue] = useState(60);

  const handleChangeMeters = (event, value) => {
    setFilterValue(value)
    setMeter(value)
    console.log("Esto son los metros cuadrados seleccionados", value);
  };


  return (
    <Box sx={{ width: 200 }}>
      <Slider
        aria-label="M²"
        value={filterValue}
        getAriaValueText={meters}
        valueLabelDisplay="auto"
        step={20}
        marks={true}
        min={30}
        max={300}
        onChange={handleChangeMeters}
      />
    </Box>
  );
}
///// End Square_meters filter
/// rooms filter
export function RoomFilter() {
  //const [room, setRoom] = React.useState('');
  const { room, setRoom } = useContext(HousingContext);


  const handleChangeRooms = (event) => {
    setRoom(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small-label">Habitaciones</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={room}
        label="Room"
        onChange={handleChangeRooms}
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
  const { baths, setBaths } = useContext(HousingContext);


  const handleChangeBaths = (event) => {
    setBaths(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
      <InputLabel id="demo-select-small-label">Baños</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={baths}
        label="Bath"
        onChange={handleChangeBaths}
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
  const { garage, setGarage } = useContext(HousingContext);

  const handleChangeGarage = (event) => {
    setGarage(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
      <InputLabel id="demo-select-small-label">Garaje</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={garage}
        label="Garage"
        onChange={handleChangeGarage}
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
  const {checkbox, setCheckbox} = useContext(HousingContext);

  const handleChangeCheckbox = (event) => {
    setCheckbox({
      ...checkbox,
      [event.target.name]: event.target.checked,
    });
  };

  const { closet, air_condicioned, heating, elevator, outside_view, garden, pool, terrace, storage, accessible } = checkbox;
  const error = [closet, air_condicioned, heating, elevator, outside_view, garden, pool, terrace, storage, accessible].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Equipamiento</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={closet} onChange={handleChangeCheckbox} name="closet" />
            }
            label="Armarios"
          />
          <FormControlLabel
            control={
              <Checkbox checked={air_condicioned} onChange={handleChangeCheckbox} name="air_condicioned" />
            }
            label="Aire acondicionado"
          />
          <FormControlLabel
            control={
              <Checkbox checked={heating} onChange={handleChangeCheckbox} name="heating" />
            }
            label="Calefacción"
          />
          <FormControlLabel
            control={
              <Checkbox checked={elevator} onChange={handleChangeCheckbox} name="elevator" />
            }
            label="Ascensor"
          />
          <FormControlLabel
            control={
              <Checkbox checked={outside_view} onChange={handleChangeCheckbox} name="outside_view" />
            }
            label="Vistas al exterior"
          />
          <FormControlLabel
            control={
              <Checkbox checked={garden} onChange={handleChangeCheckbox} name="garden" />
            }
            label="Jardín"
          />
          <FormControlLabel
            control={
              <Checkbox checked={pool} onChange={handleChangeCheckbox} name="pool" />
            }
            label="Piscina"
          />
          <FormControlLabel
            control={
              <Checkbox checked={terrace} onChange={handleChangeCheckbox} name="terrace" />
            }
            label="Terraza"
          />
          <FormControlLabel
            control={
              <Checkbox checked={storage} onChange={handleChangeCheckbox} name="storage" />
            }
            label="Trastero"
          />
          <FormControlLabel
            control={
              <Checkbox checked={accessible} onChange={handleChangeCheckbox} name="accessible" />
            }
            label="Accesible"
          />
        </FormGroup>
      </FormControl>

    </Box>
  );
}




/// end checkbox filters