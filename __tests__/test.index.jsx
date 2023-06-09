import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../Contexts/AuthContext';
import { Register } from './Register';
import { register } from '../apiService/apiService';
import { act } from 'react-dom/test-utils';

jest.mock('../apiService/apiService');

describe('Register', () => {
  beforeEach(() => {
    register.mockResolvedValueOnce({
      token: '123',
    });
    register.mockRejectedValueOnce({ response: { data: { error: { message: 'Registration failed' } } } });
  });
  it('renders the register form', async () => {
    render(
      <AuthContext.Provider value={{ setLoginState: jest.fn() }}>
        <Register />
      </AuthContext.Provider>
    );
    expect(screen.getByText('Regístrate en Domus')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellidos')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('contraseña')).toBeInTheDocument();
    expect(screen.getByLabelText('Quiero recibir inspiración, promociones de marketing y actualizaciones via email.')).toBeInTheDocument();
    expect(screen.getByText('Registrarme')).toBeInTheDocument();
  });
  it('submits the register form with correct data', async () => {
    const setLoginState = jest.fn();
    render(
      <AuthContext.Provider value={{ setLoginState }}>
        <Register />
      </AuthContext.Provider>
    );
    const nameInput = screen.getByLabelText('Nombre');
    const surnameInput = screen.getByLabelText('Apellidos');
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('contraseña');
    const submitButton = screen.getByText('Registrarme');
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'John' } });
      fireEvent.change(surnameInput, { target: { value: 'Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@doe.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.click(submitButton);
      await new Promise(resolve => setTimeout(resolve, 1000));
    });
    expect(register).toHaveBeenCalledWith({
      email: 'john@doe.com',
      password: 'password',
      name: 'John',
      surname: 'Doe',
      subscription: false
    });
    expect(window.localStorage.getItem('token')).toEqual('123');
    expect(setLoginState).toHaveBeenCalledWith(true);
  });
  it('displays error message if registration failed', async () => {
    const setLoginState = jest.fn();
    render(
      <AuthContext.Provider value={{ setLoginState }}>
        <Register />
      </AuthContext.Provider>
    );
    const submitButton = screen.getByText('Registrarme');
    await act(async () => {
      fireEvent.click(submitButton);
      await new Promise(resolve => setTimeout(resolve, 100)); // Espera un tiempo para que se muestre el mensaje de error
    });
    expect(register).toHaveBeenCalled();
    expect(screen.getByText(/Registration failed/)).toBeInTheDocument();
  });
});
