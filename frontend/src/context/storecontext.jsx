import { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);
import axios from 'axios';

const StoreContextProvider = (props)=>{
const[cartItems,setCartItems] = useState({})
const[food_list,setFoodlist]=useState([])
const url = "https://food-delivery-4-lmnn.onrender.com"
const[token,setToken] = useState("")

const addToCart = async(itemId)=>{
if(!cartItems[itemId]){
    setCartItems((prev)=>({...prev,[itemId]:1}))
}
else{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
}
if(token){
    await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
}
}

const removeFromCart = async(itemId)=>{
setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
if(token){
    await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
}
}

const getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for(const item in cartItems)
    {
        if(cartItems[item]>0){
            let itemInfo = food_list.find((product)=>product._id === item);
            totalAmount += itemInfo.price* cartItems[item]
        }
       
    }
    return totalAmount;
}


const fetchFoodlist = async()=>{
    const res = await axios.get(url+"/api/food/list");
    setFoodlist(res.data.data)
    console.log(res.data,"foodlist")
}
const loadCartData = async(token) =>{
    const res =await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(res.data.cartData)
}


useEffect(()=>{
fetchFoodlist();

},[])

useEffect(()=>{

async function loadData(){
    await fetchFoodlist();
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
    }
   
}
loadData()
},[])

/* useEffect(()=>{
console.log(cartItems)
},[cartItems]) */

const contextValue={
food_list,
cartItems,
setCartItems,
addToCart,
removeFromCart,
getTotalCartAmount,
url,
token,
setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
