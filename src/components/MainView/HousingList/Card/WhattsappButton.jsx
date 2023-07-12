import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const WhatsAppButton = ({ phoneNumber }) => {
  const handleMouseEnter = () => {
    // Lógica adicional si se desea realizar alguna acción al pasar el cursor sobre el botón
  };

  const handleMouseLeave = () => {
    // Lógica adicional si se desea realizar alguna acción al retirar el cursor del botón
  };

  return (
    <Tooltip title="Enviar WhatsApp">
      <IconButton
        component="a"
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        size="small"
        style={{ marginBottom: '5px' }}
      >
        <WhatsAppIcon color="primary" fontSize="medium" />
      </IconButton>
    </Tooltip>
  );
};
