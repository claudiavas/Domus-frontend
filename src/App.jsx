import React, { useEffect, useState } from 'react';
import './App.css';
import { Container } from '@mui/material';
import ResponsiveDrawer from './components/ResponsiveDrawer/ResponsiveDrawer';
import SignUp from './components/Authentication/SignUp/SignUp';
import SignIn from './components/Authentication/SignIn/SignIn';

const App = () => {
 
  return (
    <Container>
      <div className="App">
        {/* <SignUp/> */}
        {/* <SignIn/> */}
        <ResponsiveDrawer/>
      </div>
    </Container>
  );
};

export default App;