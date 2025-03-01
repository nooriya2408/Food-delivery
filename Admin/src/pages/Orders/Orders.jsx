import React from 'react'
import './Orders.css'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../components/assets/assets'

const Orders = ({url}) => {
  const[orders,setOrders] = useState([])

  const fetchAllOrders = async()=>{
    const res = await axios.get(url+"/api/order/list");
    if(res.data.success){
      setOrders(res.data.data)
      console.log(res.data.data)
    }else{
toast.error("Error")
    }
  }

  const statusHandler = async(e,orderId)=>{
    //console.log(e,orderId,"orderid")
    const res = await axios.post(url+"/api/order/status",{
      orderId,
      status:e.target.value
    })
    if(res.data.success){
      await fetchAllOrders();
    }
  }
  useEffect(()=>{
fetchAllOrders();
  },[])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,i)=>(
<div  key={i}className='order-item'>
  <img src={assets.parcel_icon} alt="" />
  <div>
    <p className='order-item-food'>
      {order.items.map((item,i)=>{
  if(i===order.items.length-1){
    return item.name + " x " + item.quantity
  }else{
    return item.name + " x "+ item.quantity + ", "
  }
      })}
    </p>
    <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
<div className='order-item-address'>
  <p>{order.address.street+","}</p>
  <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
</div>
<p className='order-item-phone'>{order.address.phone}</p>
  </div>
  <p>Items:{order.items.length}</p>
  <p>${order.amount}</p>
  <select onChange={(e)=>statusHandler(e,order._id)}  value={order.status} >
    <option value="Food Processing">Food Processing</option>
    <option value="Out for delivery">Out for delivery</option>
    <option value="Delivered">Delivered</option>
  </select>
</div>
        ))}
      </div>
    </div>
  )
}

export default Orders