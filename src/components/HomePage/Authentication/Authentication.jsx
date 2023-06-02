import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/auth/register', {
        email: email,
        password: password,
      });
      const { token, user } = response.data;
      // Guardar el token y los datos del usuario en el estado o en el almacenamiento local
      console.log(token, user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', {
        email: email,
        password: password,
      });
      const { token, user } = response.data;
      // Guardar el token y los datos del usuario en el estado o en el almacenamiento local
      console.log(token, user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleRegister}>Register</button>

      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AuthForm;