import React, { useState, useEffect } from 'react'
import { useSelector}  from 'react-redux'
import Loader from '../../utilities/Loader'
import {logoutuser} from '../../actions/userAction'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
const Myprofile = () => {
    const dispatch=useDispatch()
    const[profile,setProfile]=useState("product/review.jpeg")
    const { user, loading } = useSelector(state => state.authState)

    useEffect(()=>{
         if (user){
        setProfile(user.avatar)

    }

    },[user])

 
   

   

  return ( 
    <div>
    {loading || !user ?<Loader/>:
        <div>
          <div className="container container-fluid">
        <h2 className="mt-5 ml-5">My Profile</h2>
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid" src={profile} alt='' />
                </figure>
                <a href='/updateprofile' id="edit_profile" className="btn btn-primary btn-block my-5" >
                    Edit Profile
                </a>
            </div>
     
            <div className="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{user.name}</p>
     
                 <h4>Email Address</h4>
                 <p>{user.email}</p>

                 <a href="/logout" className="btn btn-danger btn-block mt-5" onClick={(e) => {
                    e.preventDefault();
                    dispatch(logoutuser())
                }}>
                    Logout
                
                </a>

                <Link to="/changepassword" className="btn btn-primary btn-block mt-3">
                    Change Password
                </Link>
            </div>
        </div>
    </div>

    </div>
    }
    </div>
    
  )
}

export default Myprofile