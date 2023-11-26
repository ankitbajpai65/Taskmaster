import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup'
import Error from './Components/Error/Error';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const isLogin = localStorage.getItem("isLogin");
  
  return (
    <>
      <Navbar userData={userData} setUserData={setUserData} />
      <Routes>
        <Route index element={<Home userData={userData} />} />
        <Route path='/login' element={!isLogin && <Login />} />
        <Route path='/signup' element={!isLogin && <Signup />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
