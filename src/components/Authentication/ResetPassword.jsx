import React, { useState, useContext, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';
import { updateUser } from '../apiService/apiService';
import { AuthContext } from '../Contexts/AuthContext';

export const ResetPassword = () => {
  const { profile, setProfile } = useContext(AuthContext);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [open, setOpen] = useState(false);
  const [errorOpened, setErrorOpened] = useState(false);
  const [successOpened, setSuccessOpened] = useState(false);
  
  const [user, setUser] = useState({});
 

  const handleUpdate = async (updatedUser) => {
    try {
      const response = await updateUser(profile._id, updatedUser);
      setSuccessMessage("Contraseña actualizada con éxito.");
      setSuccessOpened(true);
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      setErrorMessage('Error al actualizar la contraseña. Por favor, intenta nuevamente.');
      setErrorOpened(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newPassword) {
      setErrorMessage('Ingresa una contraseña válida');
      setErrorOpened(true);
      return;
    }

    if (!confirmPassword) {
      setErrorMessage('Confirma tu contraseña');
      setErrorOpened(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      setErrorOpened(true);
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    console.log(updatedUser);
    handleUpdate(updatedUser);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setErrorOpened(false);
    setSuccessMessage('');
    setSuccessOpened(false);
  };

  useEffect(() => {
    setErrorOpened(false);
    setErrorMessage('');
    setSuccessOpened(false);
    setSuccessMessage('');
  }, [open]);

  const handleErrorMessageClose = () => {
    setErrorOpened(false);
  };

  const handleSuccessMessageClose = () => {
    setSuccessOpened(false);
  };

  return (
    <>
      <Button color="primary" variant="outlined" onClick={() => setOpen(true)}>Cambiar contraseña</Button>
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

      <Snackbar open={errorOpened} autoHideDuration={5000} onClose={handleErrorMessageClose}>
        <Alert elevation={6} variant="filled" onClose={handleErrorMessageClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={successOpened} autoHideDuration={5000} onClose={handleSuccessMessageClose}>
        <Alert elevation={6} variant="filled" onClose={handleSuccessMessageClose} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
