// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider} from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import Home from './components/Home';
import Store from './utilities/Store';
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import ProductDetails from './components/layouts/ProductDetail.jsx';

import NotFound from './components/layouts/NotFound.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx'
import Myprofile from './components/User/Myprofile.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import UpdateUser from './components/User/UpdateUser.jsx';
import ChangePassword from './components/ChangePassword.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import Resetpassword from './components/Resetpassword.jsx';
import Cart from './Cart.jsx';

import Shipping from './Shipping.jsx';
import Payment from './Payment.jsx';
import Confirm from './Confirm.jsx';



const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/search',
        element: <Home />
      },
      {
          
        path:`/productdetails/:id`,
        element: <ProductDetails />
      },
      {
        path:'/404',
        element:<NotFound/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:"/logout",
        element:<Home/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/myprofile",
        element:<ProtectedRoute><Myprofile/></ProtectedRoute>
      },
      {
        path:"/updateprofile",
        element:<UpdateUser />
      },
      {
        path:"/changepassword",
        element:<ProtectedRoute><ChangePassword/></ProtectedRoute>
      },
      {
        path:"*",
        element:<NotFound/>
      },
      {
        path:"/forgotpassword",
        element:<ForgotPassword/>
      },
      {
        path:"/password/reset/:token",
        element:<Resetpassword/>
      
      },
      {
        path:"/cart",
        element:<Cart/>
      
      },
      {
        path:"/shipping",
        element:<ProtectedRoute><Shipping/></ProtectedRoute>
      },
      {
        path:"/order/confirm",
        element:<ProtectedRoute><Confirm/></ProtectedRoute>
      },
      {
        path:"/payment",
        element:<ProtectedRoute><Payment/></ProtectedRoute>
      },
  
  
       
      
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
  <HelmetProvider>
    <ToastContainer/>
    <RouterProvider router={router} />
   </HelmetProvider>
   </Provider>
)
