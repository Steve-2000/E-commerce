import React, { useState } from 'react';
import Search from '../Search';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutuser} from '../../actions/userAction'
import Myprofile from '../User/Myprofile';
// import axios from 'axios';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { isAuthenticated, user } = useSelector(state => state.authState);
  const{items}=useSelector(state=>state.cartState)
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = async () => {

      // Call backend to clear HttpOnly cookie (adjust URL if your logout route differs)
      dispatch(logoutuser()) 


    setShowDropdown(false);
    navigate("/")
 
  }
  const Myprofile=()=>{
    navigate("/myprofile")
    
  }


  return (
    <nav className="navbar row align-items-center">

      {/* Logo */}
      <div className="col-12 col-md-3">
        <Link to="/" className="navbar-brand">
          <img width="180" src="/logo.png" alt="Logo" />
        </Link>
      </div>

      {/* Search */}
      <div className="col-12 col-md-5">
        <Search />
      </div>

      {/* Auth Section */}
      <div className="col-12 col-md-4 text-center">
        {isAuthenticated && user ? (
          <div className="dropdown d-inline text-white">
            <button
              className="btn dropdown-toggle mr-4"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <figure className="avatar avatar-nav" >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
              </figure>
              <span className="ml-2 px-3 py-2 m-2 text-white bg-primary rounded">{user.name}</span>
            </button>

            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
              <button
                onClick={logout}
                className="dropdown-item text-danger"
              >

                Logout
              </button>


              <button
                onClick={Myprofile}
                className="dropdown-item text-danger"
              >

                mrprofile
              </button>
              

            </div>
          </div>
        ) : (
          <Link to="/login" className="btn" id="login_btn">
            Login
          </Link>
        )}
        <Link to="/cart">
          <i className="fa fa-shopping-cart fa-2x text-white" aria-hidden="true"></i>
        </Link>
        <span id="cart_count" className="ml-1 text-white">{items.length}</span>
      </div>

    </nav>
  );
}
