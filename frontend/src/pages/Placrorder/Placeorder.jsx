import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../context/storecontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Placeorder = () => {
  const{getTotalCartAmount,token,food_list,cartItems,url} =useContext(StoreContext)

  const[data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:''
  })

  const onChangeHandler =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }  

  const placeOrder =async(e) =>{
e.preventDefault();
let orderItems=[];
food_list.map((item)=>{
  if(cartItems[item._id]>0){
    let itemInfo = item;
    itemInfo["quantity"] = cartItems[item._id];
    orderItems.push(itemInfo)
  }
})
//console.log(orderItems)
let orderData = {
  address:data,
  items:orderItems,
  amount:getTotalCartAmount()+2,
}
let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
if(response.data.success){
  const {session_url} = response.data;
  console.log(session_url,"url")
  window.location.replace(session_url);
}
else{
  alert("Error");
}
  }

  const navigate = useNavigate();
  useEffect(()=>{
if(!token){
  alert("please login")
  navigate("/card")
 
}
else if(getTotalCartAmount()===0){
  navigate('/card')
}
  },[token])
  return (
   <form onSubmit={placeOrder} action="" className="place-order">
    <div className="place-order-left">
<p className="title">Delivery Information</p>
<div className="multi-fields">
  <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
  <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' />
</div>
<input  required value={data.email} name='email' onChange={onChangeHandler} type="text" placeholder='Email address'/>
<input required value={data.street} name="street" onChange={onChangeHandler}type="text" placeholder='street' />
<div className="multi-fields">
  <input required value={data.city} name='city' onChange={onChangeHandler} type="text" placeholder='city' />
  <input required  value={data.state} name='state' onChange={onChangeHandler } type='text' placeholder='state' />
</div>
<div className="multi-fields">
  <input required value={data.zipcode} name='zipcode' onChange={onChangeHandler} type="text" placeholder='Zip code' />
  <input required value={data.country} name="country" onChange={onChangeHandler} type='text' placeholder='Country' />
</div>
<input required value={data.phone} name="phone" onChange={onChangeHandler} type="text" placeholder='Phone' />
    </div>
    <div className="place-order-right">
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
        <button type='submit'>PROCEED TO PAYMENT</button>
    </div>
    </div>
   </form>
  )
}

export default Placeorder