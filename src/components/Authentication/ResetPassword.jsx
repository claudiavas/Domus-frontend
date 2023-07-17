import React, { useState, useContext, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';
import { resetPassword } from '../apiService/apiService';
import { AuthContext } from '../Contexts/AuthContext';
import { login } from '../apiService/apiService';
import { useNavigate } from 'react-router-dom';

export const ResetPassword = ({ open, onClose, userId, email }) => {

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleLogin = async (newPassword, email) => {
    setIsLoading(true);
    try {
      const response = await login({
        email: email,
        password: newPassword
      });
      const token = response.token;
      window.localStorage.setItem("token", token);
      navigate("/MainView");
    } catch (error) {
      console.log("este es el error", error);
      setErrorMessage(error);
      setErrorSnackbarOpen(true);
      setTimeout(() => {
        setErrorMessage("");
        setErrorSnackbarOpen(false);
        setIsLoading(false);
      }, 5000);
    }
    setIsLoggedIn(true);
  };


  const handleUpdate = async (userId, newPassword) => {
    try {
      const response = await resetPassword(userId, { password: newPassword });
      setSuccessMessage(response.message || "Contraseña actualizada correctamente.");
      setSuccessSnackbarOpen(true);
      alert("Contraseña actualizada correctamente.");
      if (!isLoggedIn) {
        handleLogin(newPassword, email);
      }
      // onClose();

    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      alert("Error al actualizar la contraseña. Por favor, intenta nuevamente.");
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

    handleUpdate(userId, newPassword)
    onClose();
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
