import { Divider, Toolbar } from "@mui/material";
import { BathFilter, LocationFilter, PriceFilterMin, SquareMeters, RoomFilter, GaragesFilter, CheckboxesFilters, PriceFilterMax } from "../../FilterHousing";

function Filters(props) {

    return (
  
      <div>
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
        <Divider />  
        <BathFilter/>
        <Divider />  
        <GaragesFilter/>
        <Divider />  
        <CheckboxesFilters/>
      </div>
  
    )}
  
  export default Filters;