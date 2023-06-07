import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

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

export default function SelectTextFields() {
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
