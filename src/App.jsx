import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Layout from './pages/Layout'
import ResumeUpload from './pages/ResumeUpload'
import History from './pages/History'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Setting from './pages/Setting'
import AllReviews from './pages/AllReviews'

const App = () => {
  return (
    <div id='HomeContainer'>
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/reviews' element={<AllReviews/>} />
        <Route element={<Layout/>}>
           <Route path='/profile/' element={<ResumeUpload/>} />
           <Route path='/history' element={<History/>} />
           <Route path='/setting' element={<Setting/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App