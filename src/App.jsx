import React, { useEffect, useState } from 'react';
import './App.css';
import { Container } from '@mui/material';
import { MainView } from './components/MainView/MainView';
import { Register } from './components/HomePage/Authentication/Register';
import { Login } from './components/HomePage/Authentication/Login';
// import { ForgotPassword } from './components/HomePage/Authentication/ForgotPassword';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { HomePage } from './components/HomePage/HomePage';
import { HousingDetails } from './components/HousingDetails/HousingDetails';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

const App = () => {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        {/* <Route path="/forgotpassword" element={<ForgotPass/>}></Route> */}
        <Route path="/mainview" element={<MainView/>}></Route>
        <Route path="/housingdetails/:slug" element={<HousingDetails/>}></Route>


        <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;