import React, { useContext, useEffect, useState } from 'react'
import './loginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storecontext'
import axios from 'axios'

const loginPopup = ({setShowLogin}) => {
    const{url,setToken} = useContext(StoreContext)
    const[currState,setCurrState] = useState("Login")
    const[data,setData] = useState({
        name:'',
        email:"",
        password:""
    })

    const onchangeHandler =(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async(e)=>{
        e.preventDefault()
        let newUrl = url;
        if (currState === "Login") {
            newUrl += '/api/user/login'
        }else{
            newUrl += '/api/user/register'
        }

        const res = await axios.post(newUrl,data)
        if (res.data.success) {
            setToken(res.data.token)
            localStorage.setItem("token",res.data.token)
            setShowLogin(false)
        }else{
            alert(res.data.message)
        }
    }

   /*  useEffect(()=>{
  console.log(data)
    },[data]) */
  return (
    <div className="login-popup">
<form onSubmit={onLogin} action="" className="login-popup-container">
    <div className="login-popup-title">
        <h2>{currState}</h2>
        <img  onClick={()=>setShowLogin(false)}src={assets.cross_icon} alt="" />
    </div>
    <div className="login-popup-inputs">
        {currState==="Login"?<></>:<input onChange={onchangeHandler} name='name' value={data.name} type="text" placeholder='your name' required/>}
        
        <input onChange={onchangeHandler} name='email' value={data.email} type="email" placeholder='your email' required />
        <input onChange={onchangeHandler} name='password' value={data.password} type="password" placeholder='password' required />
    </div>
    <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
    <div className="login-popup-condition">
        <input type="checkbox" required />
        <p>By continuing,i agree to the terms of use & privacy policy.</p>
    </div>
    {currState=== "Login"? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:   
    
    <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
</form>
    </div>
  )
}

export default loginPopup