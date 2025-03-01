import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Placeorder from './pages/Placrorder/Placeorder'
import Home from './pages/Home/Home'
import Card from './pages/Card/Card'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/loginPopup/loginPopup'
import Verify from './pages/Verify/Verify'
import Myorder from './pages/Myorder/Myorder'

const App = () => {
  const[showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/card' element={<Card />} />
        <Route path='/order' element={<Placeorder />} />
     <Route path='/verify' element={<Verify />} /> 
     <Route path='/myorder' element={<Myorder />} />
      </Routes>
    </div><Footer /></>
  )
}


export default App