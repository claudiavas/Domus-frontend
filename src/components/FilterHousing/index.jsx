import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';



//Location
const locationsProvince = [
    {
      value: 'Madrid',
      label: 'Madrid',
    },
    {
      value: 'Barcelona',
      label: 'Barcelona',
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
  
  export function LocationFilter() {
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
            defaultValue=" "
            //helperText="Selecciona un precio minimo"
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
            defaultValue=" "
            SelectProps={{
              native: true,
            }}
            //helperText="Selecciona un precio maximo"
          >
            {locationsMunicipio.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
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
