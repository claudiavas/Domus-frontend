import { Divider, Toolbar } from "@mui/material";
import { LocationFilter, PriceFilter } from "../../FilterHousing";

function Filters(props) {

    return (
  
      <div>
        <Toolbar />
        <h2>Ubicación</h2>
         <LocationFilter/> 
        <Divider />
        <h2>Precio</h2>  
         <PriceFilter /> 
        <Divider />  
        AQUI VAN LOS FILTROS
        <Divider />  
        AQUI VAN LOS FILTROS
      </div>
  
    )}
  
  export default Filters;