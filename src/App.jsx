import React from 'react';
import './App.css';
import { MainView } from './components/MainView/MainView';
import { Register } from './components/Authentication/Register';
import { Login } from './components/Authentication/Login';
// import { ForgotPassword } from './components/HomePage/Authentication/ForgotPassword';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from './components/HomePage/HomePage';
import { HousingDetails } from './components/MainView/HousingDetails/HousingDetails';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { AddHousing } from './components/MainView/AddHousing/AddHousing';
// import { HouseCard } from './components/MainView/HousingList/Card/HouseCard';
import { HousingList } from './components/MainView/HousingList/HousingList';
import { UpdateHousing } from './components/MainView/HousingDetails/UpdateHousing';
import { EditUserProfile } from './components/MainView/UserProfile/EditUserProfile';

const App = () => {


return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/housinglist" element={<HousingList/>}></Route>
        {/* <Route path="/forgotpassword" element={<ForgotPass/>}></Route> */}
        <Route path="/userprofile" element={<EditUserProfile/>}></Route>
        <Route path="/mainview" element={<MainView/>}></Route>
        <Route path="/housingdetails/:_id" element={<HousingDetails/>}></Route>
        <Route path="/updatehousing/:_id" element={<UpdateHousing/>}></Route>
        <Route path="/addHousing" element={<AddHousing/>}></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
)
}

export default App;