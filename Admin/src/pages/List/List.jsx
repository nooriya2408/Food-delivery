import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
const List = () => {
const url="https://food-delivery-server-c938.onrender.com"
  const [list,setList] =useState([])

const fetchdata = async()=>{
  const response =await axios.get(`${url}/api/food/list`);
  console.log(response.data)
  if (response.data.success) {
    setList(response.data.data)
  }else{
    toast.error("error")
  }
}

const removeFood =async(foodID)=>{
  const response =await axios.post(`${url}/api/food/remove`,{id:foodID});
  await fetchdata();
  if (response.data.success) {
    toast.success(response.data.message)
  }else{
    toast.error("error")
  }
}
useEffect(()=>{
  fetchdata();
},[])
  return (
   <div className='list and flex-col'>
    <p>All Foods List</p>
    <div className="list-table">
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list.map((item,i)=>{
        return(
          <div key={i} className='list-table-format'>
             <img src={`${url}/images/`+item.image} alt="" /> 
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div> 
        )
      })}
    </div>
   </div>
  )
}

export default List
