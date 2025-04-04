import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../components/assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {
  const url ="https://food-delivery-server-c938.onrender.com";
  const[image,setImage] =useState(false)
  const[data,setData] =useState({
    name:"",
    description:'',
    price:'',
    category:'salad'
  })

  const onChangehandler =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }
 const onsubmithandler = async (e)=>{
  e.preventDefault();
  const formData = new FormData();
  formData.append("name",data.name)
  formData.append("description",data.description)
  formData.append("price",Number(data.price))
  formData.append("category",data.category)
  formData.append("image",image)
  const response = await axios.post(`${url}/api/food/add`,formData);
  if (response.data.success) {
    setData({
      name:"",
      description:'',
      price:'',
      category:'salad'
    })
    setImage(false)
    toast.success(response.data.message)
  }else{
 toast.error(response.data.message)
  }
 }
 
  return (
    <div className="add">
      <form action="" className="flex-col" onSubmit={onsubmithandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
<p>Product name</p>
<input onChange={onChangehandler} value={data.name} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangehandler} value={data.description} name="description" rows="6"placeholder="write content here"id=""></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category">
            <p>Product category</p>
            <select onChange={onChangehandler} name="category" id="">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangehandler} value={data.price} type="number" name='price' placeholder='$23' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
