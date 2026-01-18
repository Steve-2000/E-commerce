import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetpassword } from '../actions/userAction'
import { toast } from 'react-toastify'
import { clearLoginerror } from '../actions/userAction'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'

const Resetpassword = () => {
    const {token}=useParams()
    const navigate=useNavigate()
    const{resetstatusget,error}=useSelector(state=>state.authState)
    const dispatch=useDispatch()

    const [data,setData]=useState({
        password:"",
        confirmpassword:""
    })  

    useEffect(()=>{
        if(error){
            toast.error(error,{
                position:toast.POSITION.TOP_CENTER
                })
        }
        return

    },[error])
    const handleChange=(e)=>{
        console.log(e.target.value)
        setData({...data,[e.target.name]:e.target.value})
    }
    const onsubmit=(e)=>{
        e.preventDefault()
        dispatch(resetpassword(data,token))
        console.log(data)
    }   
    useEffect(()=>{
        if(resetstatusget){
           
            toast.success(resetstatusget,{
                position:toast.POSITION.TOP_CENTER,
                toastId:"success-toast",
                autoClose:1500,
                onOpen:()=>{dispatch(clearLoginerror())}
                
            })
              navigate("/login")
            return
          

        }
    },[dispatch,navigate,resetstatusget])
  return (
    <div>
        <form action="" onSubmit={onsubmit}>
            <label htmlFor="password"></label>
            <input type="password"
            name='password'
            id='password'
            value={data.password}
            onChange={handleChange}
            placeholder='enter password'
            required={true} />

            <label htmlFor="confirm password"></label>
            <input type="password"
            name='confirmpassword'
            id='confirmpassword'

            value={data.confirmpassword}
            placeholder='confirm password'
                 onChange={handleChange}
            required={true}/>

            <input type="submit" />
        </form>
    </div>
  )
}

export default Resetpassword