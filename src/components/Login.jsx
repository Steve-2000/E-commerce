import React, { Fragment, useEffect, useState } from 'react'
import Metadata from '../utilities/Metadata'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getuser } from '../actions/userAction'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { clearLoginerror } from '../actions/userAction'

const Login = () => {
    const navigate=useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch=useDispatch()
  const{isAuthenticated,error,loading,user}=useSelector(state=>state.authState)
  const location = useLocation();

  const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

  useEffect(()=>{
    if (isAuthenticated) {
      navigate(redirect);
      toast.success("Login Successful");
        // return
    }
  

    if(error){
    toast.error(error,{
        position:toast.POSITION.TOP_CENTER,
        toastId:"error-toast",
        autoClose:500,
        onOpen:()=>{dispatch(clearLoginerror())}
    })
    return
    }
  },[user,isAuthenticated,dispatch,error,navigate,redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getuser(email,password))
  }

  return (
    <Fragment>
      <Metadata title={'Login'} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link to="/forgotpassword" className="float-right mb-4">Forgot Password?</Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              LOGIN
            </button>

            <div><Link to="/register" className="float-right mt-3">New User?</Link></div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Login