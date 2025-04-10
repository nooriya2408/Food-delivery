import React, { useContext } from 'react'
import {StoreContext} from '../../context/storecontext'
import { food_list } from '../../assets/assets'
import './Card.css'
import { useNavigate } from 'react-router-dom'

const Card = () => {

  const{food_list,cartItems,removeFromCart,getTotalCartAmount,url} = useContext(StoreContext)
  const Navigate = useNavigate()
  return (
  <div className="cart">
    <div className="cart-items">
      <div className="cart-items-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
      <hr />
{food_list.map((item,i)=>{
if(cartItems[item._id]>0){


  return(
    <><div className='cart-items-title cart-items-item'>
      <img src={url+"/images/"+item.image} alt="" />
      <p>{item.name}</p>
      <p>${item.price}</p>
      <p>{cartItems[item._id]}</p>
      <p>${item.price * cartItems[item._id]}</p>
      <p onClick={()=>removeFromCart(item._id)}className='cross'>x</p>
    </div><hr /></>
  )
}
})}
    </div>
    <div className="cart-bottom">
      <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
          </div>
        </div>
        <button onClick={()=>Navigate('/order')}>PROCEED TO CHECKOUT</button>
      </div>
      <div className="cart-promocode">
        <div>
          <p>If you have a promo code, Enter it here</p>
          <div className="cart-promocode-inputs">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Card