import { Box, Button, Divider, Fab, IconButton, Toolbar } from "@mui/material";
import { BathFilter, LocationFilter, PriceFilterMin, SquareMeters, RoomFilter, GaragesFilter, CheckboxesFilters, PriceFilterMax } from "../../FilterHousing";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { width } from "@mui/system";

function Filters(props) {

  return (

    <div>
      <Box sx={{
        position: 'fixed',
        left: '0px',
        top: '0px',
        zIndex: '9998',
        backgroundColor: '#ffffff', // Fondo blanco
        padding: '0px',
        width: '312px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}>
        <Button variant="contained" color="primary" type="submit" style={{ position: 'relative' }}>
          Guardar Requerimiento
        </Button>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          left: '270px',
          bottom: '20px',
          zIndex: '9999',
        }}
      >
        <Fab
          color="action"
          aria-label="limpiar filtros"
          sx={{
            width: '30px', // Ajusta el ancho del botón
            height: '30px', // Ajusta el alto del botón
          }}
        >
          <IconButton
            aria-label="Limpiar Filtros"
            sx={{
              fontSize: '14px', // Ajusta el tamaño del ícono
            }}
          >
            <FilterAltOffIcon />
          </IconButton>
        </Fab>
      </Box>

      <Toolbar />
      <h3 style={{ marginLeft: '1em' }}>Ubicación</h3>
      <LocationFilter />
      <Divider />
      <h3 style={{ marginLeft: '1em' }}>Precio</h3>
      <PriceFilterMin />
      <PriceFilterMax />
      <br></br><br></br>
      <Divider />
      <h3 style={{ marginLeft: '1em' }}>M²</h3>
      <SquareMeters />
      <br></br><br></br>
      <Divider />
      <h3 style={{ marginLeft: '1em' }}>Caracteristicas</h3>
      <RoomFilter />
      <BathFilter />
      <GaragesFilter />
      <br></br><br></br>
      <Divider />
      <h3 style={{ marginLeft: '1em' }}>Equipamiento</h3>
      <CheckboxesFilters />
    </div>

  )
}

export default Filters;