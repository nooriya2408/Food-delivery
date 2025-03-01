import React, { useContext } from 'react'
import './fooddisplay.css'
import { StoreContext } from '../../context/storecontext'
import Fooditem from '../Fooditem/Fooditem'

const fooddisplay = ({category}) => {
const{food_list} =useContext(StoreContext)
  return (
    <div className='food-Display' id='food-Display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item,i)=>{

              if(category ==="All" || category === item.category){
                return <Fooditem key={i} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
              }
                
            })}
        </div>
    </div>
  )
}

export default fooddisplay