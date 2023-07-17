import { Divider, Toolbar } from "@mui/material";
import { BathFilter, LocationFilter, PriceFilterMin, SquareMeters, RoomFilter, GaragesFilter, CheckboxesFilters, PriceFilterMax } from "../../FilterHousing";

function Filters(props) {

    return (
  
      <div style={{ marginLeft:'1em'}}>
        <Toolbar />
        <h2>Ubicación</h2>
         <LocationFilter/>
        <Divider />
        <h2>Precio</h2>  
         <PriceFilterMin /> 
         <PriceFilterMax />
        <Divider />  
        <h2>M²</h2>  
         <SquareMeters /> 
        <Divider />  
        <RoomFilter/>
        <BathFilter/>
        <GaragesFilter/>
        <Divider />  
        <CheckboxesFilters/>
      </div>
  
    )}
  
  export default Filters;