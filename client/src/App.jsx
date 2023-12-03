import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup'
import Error from './Components/Error/Error';
import baseUrl from "../config";
import './App.css';

function App() {
  const isLogin = localStorage.getItem("isLogin");

  const [userData, setUserData] = useState(null);
  const [allTodos, setAllTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const getUserData = () => {
    fetch(`${baseUrl}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        // window.localStorage.setItem('userData', JSON.stringify(data.data));
      });
  }

  return (
    <>
      <Navbar getUserData={getUserData} userData={userData} setUserData={setUserData} allTodos={allTodos} setFilteredTodos={setFilteredTodos} />
      <Routes>
        <Route index element={<Home userData={userData} allTodos={allTodos} setAllTodos={setAllTodos} filteredTodos={filteredTodos} setFilteredTodos={setFilteredTodos} />} />
        <Route path='/login' element={!isLogin && <Login getUserData={getUserData} />} />
        <Route path='/signup' element={!isLogin && <Signup />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
