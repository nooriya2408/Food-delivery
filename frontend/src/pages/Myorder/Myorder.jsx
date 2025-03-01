import React, { useContext, useEffect, useState } from 'react'
import './Myorder.css'
import { StoreContext } from '../../context/storecontext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Myorder = () => {
   const{url,token} = useContext(StoreContext)
    const[data,setData] = useState([]);

    const fetchOrders = async () =>{
        const res = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(res.data.data)
        console.log(res.data.data);
        
    }

    useEffect(()=>{
  if(token){
    fetchOrders();
  }
    },[token])
  return (
    <div className='my-orders'>
<h2>My Orders</h2>
<div className="container">
    {data.map((order,i)=>{
        return(
            <div key={i} className="my-orders-order">
         <img src={assets.parcel_icon} alt="" />
      <p>{order.items.map((item,i)=>{
        if(i === order.items.length-1){
        return item.name+" x "+item.quantity
        }else{
            return item.name+" x "+item.quantity+', '
        }
      })}</p>
      <p>${order.amount}.00</p>
      <p>Items:{order.items.length}</p>
      <p><span>&#x25cf;</span> <b>{order.status}</b></p>
      <button onClick={fetchOrders}>Track order</button>
            </div>
        )
    })}
</div>
    </div>
  )
}

export default Myorder