import React from 'react'
    import { useState, useEffect } from 'react'
    // import {forgotpassword} from '../actions/userAction'
    import { useDispatch } from 'react-redux'
        import { useSelector } from 'react-redux'
    import { toast } from 'react-toastify'
        import { clearLoginerror } from '../actions/userAction' 
        import {forgotpasswordmail} from '../actions/userAction'
import { Navigate } from 'react-router-dom'

const ForgotPassword = () => {

const dispatch=useDispatch()
    const[email,setEmail]=useState("")
    const{loading,error,fogotmail}=useSelector(state=>state.authState)

    
    const handleSubmit=(e)=>{
        e.preventDefault()
        
        dispatch(forgotpasswordmail(email))
        setEmail("")
        toast.success(fogotmail,{
            position:toast.POSITION.TOP_CENTER,
            toastId:"success-toast",
            autoClose:1500,
            onOpen:()=>{dispatch(clearLoginerror())}
        })

      
    }
    useEffect(()=>{
        if(error&& !loading){

        toast(error,{
            type:"error",
            position:toast.POSITION.TOP_CENTER,
            toastId:"error-toast",
            autoClose:1500,
            onOpen:()=>{dispatch(clearLoginerror())}
        })
        return}
    },[error,dispatch,loading])

    useState(()=>{
        if(fogotmail){
            Navigate("/password/resetpassword/:token")


        }

    },[fogotmail])

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="email"></label>
            <input type="email"
            name='email'
            id='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='enter email'
            required={true}
            />
            <label htmlFor="submit"></label>
            <input type="submit"
            id='submit'
        

             />

        </form>
    </div>
  )
}

export default ForgotPassword