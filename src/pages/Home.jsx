import React from 'react'
import './styles/home.css'
import Navbar from '../layouts/Navbar'
import Main from '../layouts/Main'
import Features from '../layouts/Features'
import Benefit from '../layouts/Benefit'
import Dashboard from '../layouts/Dashboard'
import Review from '../layouts/Review'
import Footer from '../layouts/Footer'

const Home = React.memo(() => {
  return (
    <div id='hero'>
      <Navbar/>
      <Main/>
      <Features/>
      <Dashboard/>
      <Benefit/>
      <Review/>
      <Footer/>
      </div>
  )
})

Home.displayName = 'home'
export default Home