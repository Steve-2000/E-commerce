import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateprofile } from '../../actions/userAction'
import { toast } from 'react-toastify'
import { clearLoginerror } from '../../actions/userAction'
import Loader from '../../utilities/Loader'
import { useNavigate } from 'react-router-dom'
// import { logoutuser
// import { logoutuser } from '../actions/userAction'


const UpdateUser = () => {

    const{user,loading,error}=useSelector(state=>state.authState)
    const navigate = useNavigate();
 
    const[userData,setUserData]=useState(
            {
                name:"",
                email:"",
                avatar:null
            }
        )

    const dispatch=useDispatch()
    
        useEffect(()=>{
            if(user){
                setUserData({
                    name: user.name,
                    email: user.email,
                    avatar: null
                })
            }
            if(error){
                toast(error,{
                    type:"error",
                    position:toast.POSITION.TOP_CENTER,
                    onOpen:()=>{dispatch(clearLoginerror())},    
                    toastId:"error-toast",
                    autoClose:500,
                    
                })
            }


        },[dispatch,error,user])

   

    const handlechange=(e)=>{

        if(e.target.name==="avatar"){
            const reader=new FileReader()
            reader.readAsDataURL(e.target.files[0]);
            reader.onload=()=>{
                if(reader.readyState===2){
                    setUserData({...userData, avatar: e.target.files[0]})
                }
            }
        }
        else{
            setUserData({...userData,[e.target.name]:e.target.value})
        }
    }

    const handlesubmit =(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append("name",userData.name)
        formdata.append("email",userData.email)
        if (userData.avatar) { // Only append avatar if it's a file
            formdata.append("avatar",userData.avatar)
        }
        console.log(formdata)
        dispatch(updateprofile(formdata))
        toast("done",{
            type:"success",
            position:toast.POSITION.TOP_CENTER,
            toastId:"success-toast",
            autoClose:500,
            onOpen:()=>{dispatch(clearLoginerror())}
        })
        navigate("/myprofile")
       
    }



  return (
    <div className="row wrapper">
        {loading || !user ? <Loader/> :
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" encType='multipart/form-data' onSubmit={handlesubmit}>
                <h1 className="mt-2 mb-5">Update Profile</h1>

                <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input 
                        type='text'
                        id='name_field'
                        className='form-control'
                        name='name'
                        value={userData.name}
                        onChange={handlechange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input 
                        type='email' 
                        id='email_field'
                        className='form-control'
                        name='email'
                        value={userData.email}
                        onChange={handlechange}
                    />
                </div>
            
                <div className='form-group'>
                    <label htmlFor='avatar_upload'>Avatar</label>
                    <div className='d-flex align-items-center'>
                        <div className='custom-file'>
                            <input type='file' name='avatar' className='custom-file-input' id='customFile' onChange={handlechange} />
                            <label className='custom-file-label' htmlFor='customFile'>Choose Avatar</label>
                        </div>
                    </div>
                </div>

                <button type='submit' className="btn update-btn btn-block mt-4 mb-3" >Update</button>
           
            </form>
          </div>
        }
      
    

     
    </div>
  )
}

export default UpdateUser