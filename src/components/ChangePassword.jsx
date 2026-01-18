import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { passwordchange } from '../actions/userAction'
const ChangePassword = () => {
        const dispatch=useDispatch()
    const [data,setData] = useState({
        password: "",
        newpassword: "",
        confirmpassword: "",
    });
    const handlechange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

 
        const handlepasswordchange=(e)=>{
            e.preventDefault()
         
            dispatch(passwordchange(data))
            console.log(data)
            console.log("done")
            setData({
                password: "",
                newpassword: "",
                confirmpassword: "",
            });
        }



  

  return (
    <div>
        <form action="" onSubmit={handlepasswordchange}>
            <div className="form-group">
                <label htmlFor="old_password_field">Old Password</label>
                <input
                    type="password"
                    id="old_password_field"
                    className="form-control"
                    value={data.password}
                    name='password'
                   onChange={handlechange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="new_password_field">New Password</label>
                <input
                    type="password"
                    id="new_password_field"
                    className="form-control"
                    value={data.newpassword}
                    name='newpassword'
            
                        onChange={handlechange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="confirm_password_field">Confirm Password</label>      
                <input type="password"
                    id="confirm_password_field"
                    className="form-control"
                    value={data.confirmpassword}
                    name='confirmpassword'
                        onChange={handlechange}
                />          

            </div>
            <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Change Password</button>

        </form>
    </div>
  )
}

export default ChangePassword