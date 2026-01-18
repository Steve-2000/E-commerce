import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registeruser, clearLoginerror } from '../actions/userAction'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Metadata from '../utilities/Metadata'
// import { clearLoginerror } from '../actions/userAction'

const Register = () => {
    const {error,loading,user}=useSelector(state=>state.authState)
    const navigate=useNavigate()
    // const navigate=useNavigate()
    const dispatch=useDispatch()
    const [userData,setUserData]=useState({
        name:"",
        email:"",
        password:"",
    })
    const[preview,setPreview]=useState("product/review.jpeg")
    
    const[avatar,setavatar]=useState(null)
    const onChange=(e)=>{
        if(e.target.name==="avatar"){
            const reader=new FileReader()

            reader.onload=()=>{
                if(reader.readyState === 2){
                    setPreview(reader.result);
                    setavatar(e.target.files[0]);
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            setUserData({...userData,[e.target.name]:e.target.value})
        }
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        const formdata=new FormData()
        formdata.append("name",userData.name)
        formdata.append("email",userData.email)
        formdata.append("password",userData.password)
        formdata.append("avatar",avatar)
        dispatch(registeruser(formdata))
      

    }
    useEffect(()=>{
        if(error){
            toast(error,{
                type:"error",
                position:toast.POSITION.TOP_CENTER,
                onOpen:()=>{dispatch(clearLoginerror())}
            })

        }

        
    },[error,dispatch])

    useEffect(()=>{
        if(user){
            toast.success("done")
            navigate("/")
        }

    },[user,navigate])

    

  return (
    <div className="row wrapper">
        <Metadata title={'Register'} />
        <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                <h1 className="mb-3">Register</h1>

                <div className="form-group">
                    <label htmlFor="email_field">Name</label>
                    <input name="name" onChange={onChange} type="name" id="name_field" className="form-control" value={userData.name} />
                </div>

                <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                        type="email"
                        id="email_field"
                        name="email" 
                        onChange={onChange}
                        className="form-control"
                        value={userData.email}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password_field">Password</label>
                    <input
                        type="password"
                        id="password_field"
                        name="password" 
                        onChange={onChange}
                        className="form-control"
                        value={userData.password}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='avatar_upload'>Avatar</label>
                    <div className='d-flex align-items-center'>
                        <div>
                            <figure className='avatar mr-3 item-rtl'>
                                <img
                                    src={preview}
                                    className='rounded-circle'
                                    alt='image'
                                />
                            </figure>
                        </div>
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='avatar'
                                onChange={onChange}
                                className='custom-file-input'
                                id='customFile'
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                Choose Avatar
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    id="register_button"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled={loading}
                >
                    REGISTER
                </button>
            </form>
        </div>
    </div>
  )
}

export default Register