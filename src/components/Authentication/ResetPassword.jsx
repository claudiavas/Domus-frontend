import React, { useState, useContext, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';
import { resetPassword } from '../apiService/apiService';
import { AuthContext } from '../Contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { getPayload } from '../apiService/apiService';

export const ResetPassword = ({open, onClose}) => {
  
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { token } = useParams();
  const { profile, setProfile } = useContext(AuthContext);


  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleUpdate = async (updatedUser) => {
    try {
      if (isLoggedIn) {
        const response = await resetPassword(profile._id, {password: newPassword});
        setSuccessMessage("Contraseña actualizada correctamente.");
        setSuccessSnackbarOpen(true);
        onClose(); // Cerrar el diálogo aquí
      } else {
        // Obtener el payload decodificado del token
        const payload = await getPayload(token);
        const userId = payload.userId;
  
        // Enviar el userId y la nueva contraseña al backend
        const response = await resetPassword(userId, {password: newPassword});
        setSuccessMessage("Contraseña actualizada correctamente.");
        setSuccessSnackbarOpen(true);
        onClose(); // Cerrar el diálogo aquí
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      setErrorMessage('Error al actualizar la contraseña. Por favor, intenta nuevamente.');
      setErrorSnackbarOpen(true);
    }
  };
  
  
  const handleSubmit = async (event) => {
    
    if (!newPassword) {
      setErrorMessage('Ingresa una contraseña válida');
      setErrorSnackbarOpen(true);
      return;
    }

    if (!confirmPassword) {
      setErrorMessage('Confirma tu contraseña');
      setErrorSnackbarOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      setErrorSnackbarOpen(true);
      return;
    }

    handleUpdate(profile.id, newPassword);
    handleClose();
  };

  const handleClose = () => {
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setErrorSnackbarOpen(false);
    setSuccessMessage('');
    setSuccessSnackbarOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cambiar Contraseña</DialogTitle>
        <DialogContent>
          <TextField
            label="Nueva Contraseña"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        open={errorSnackbarOpen} 
        autoHideDuration={5000} 
        onClose={() => setErrorSnackbarOpen(false)} 
        >
        <Alert 
          elevation={6} 
          variant="filled" 
          severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        open={successSnackbarOpen} 
        autoHideDuration={5000} 
        onClose={() => setSuccessSnackbarOpen(false)} 
        >
        <Alert 
          elevation={6} 
          variant="filled"
          severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
