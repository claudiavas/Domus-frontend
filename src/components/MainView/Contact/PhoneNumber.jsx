import React, { useState } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import { IconButton, Tooltip } from '@mui/material';

export const PhoneNumber = ({ phoneNumber }) => {
  const [showNumber, setShowNumber] = useState(false);

  const handleMouseEnter = () => {
    setShowNumber(true);
  };

  const handleMouseLeave = () => {
    setShowNumber(false);
  };

  const handleClick = () => {
    // Verificar si el dispositivo es móvil
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobileDevice) {
      // Copiar el número en la aplicación del teléfono
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
    >
      <Tooltip title={phoneNumber} arrow>
            <IconButton
              component="a"
              href={phoneNumber}
              size="small"
              style={{ marginBottom: '5px' }}
              color="primary"
            >
              <PhoneIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
    </div>
  );
};
