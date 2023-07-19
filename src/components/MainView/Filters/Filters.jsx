import { Divider, Toolbar } from "@mui/material";
import { BathFilter, LocationFilter, PriceFilterMin, SquareMeters, RoomFilter, GaragesFilter, CheckboxesFilters, PriceFilterMax } from "../../FilterHousing";

function Filters(props) {

    return (
  
      <div>
        <Toolbar />
        <h2 style={{ marginLeft:'1em'}}>Ubicación</h2>
         <LocationFilter/>
        <Divider />
        <h2 style={{ marginLeft:'1em'}}>Precio</h2>  
         <PriceFilterMin /> 
         <PriceFilterMax />
         <br></br><br></br>
        <Divider />  
        <h2 style={{ marginLeft:'1em'}}>M²</h2>  
         <SquareMeters /> 
         <br></br><br></br>
        <Divider />  
        <h2 style={{ marginLeft:'1em'}}>Caracteristicas</h2>  
        <RoomFilter />
        <BathFilter/>
        <GaragesFilter/>
        <br></br><br></br>
        <Divider />  
        <h2 style={{ marginLeft:'1em'}}>Equipamiento</h2>  
        <CheckboxesFilters/>
      </div>
  
    )}
  
  export default Filters;