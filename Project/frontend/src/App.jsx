import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import Admin from './Admin'
import AdminCreate from './AdminCreate'
import StudentHome from './StudentHome'
import MyBooks from './MyBooks'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/admincreate' element={<AdminCreate/>}></Route>
      <Route path='/studenthome' element={<StudentHome/>}></Route>
      <Route path='/mybooks' element={<MyBooks/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
