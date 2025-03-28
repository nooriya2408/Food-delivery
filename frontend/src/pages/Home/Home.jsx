import React, { useState } from 'react'
import'./Home.css'
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/Exploremenu/Exploremenu'
import FoodDisplay from '../../components/fooddisplay/fooddisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {
  const[category,setcategory] =useState("All")
  return (
    <div>
      <Header/>
      <Exploremenu category={category} setcategory={setcategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home