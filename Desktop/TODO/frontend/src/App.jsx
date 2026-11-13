import React, { useEffect } from 'react'
import Navbar from './components/navbar'  
import Home from './components/home'
import Footer from './components/footer'
import Signup from './components/signup'
import About from './components/about'
import Login from './components/login'
import Task from './components/task'
import { useDispatch } from "react-redux";
import { authActions } from "./store/index.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("userId");
  useEffect(() => {
    if(id) {
      dispatch(authActions.login(id));
    }
  }, [dispatch, id])

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/tasks" element={<Task/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
