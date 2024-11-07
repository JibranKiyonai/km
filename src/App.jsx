import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Profile from './pages/profile/page'
import Login from './pages/login/page'
import Register from './pages/register/page'
import ComissionRate from './pages/comissionRate/page'
import ComissionRateview from './pages/viewcomissionrate/page'
import Verifyid from "./pages/verifyEmail/page";
import ToLogin from './toLogin'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToLogin />} />
          <Route path="/:id" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyaccount/:token/:id" element={<Verifyid />} />
          <Route path="/comissionrate/:id" element={<ComissionRate />} />
          <Route path="/viewcomissionrate/:id" element={<ComissionRateview />} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;