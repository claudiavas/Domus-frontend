import { Box } from "@mui/material";

function Card(props) {

  return (

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
      >
        AQUI VAN LAS CARDS
      </Box>

  )}

export default Card;