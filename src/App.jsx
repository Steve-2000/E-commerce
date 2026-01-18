import React, { useEffect } from 'react'
import './App.css'
import Footer from './components/layouts/Footer'
import Header from './components/layouts/Header'
import { Outlet } from 'react-router-dom'
import { loaduser } from './actions/userAction'
import Store from './utilities/Store'
// import { useDispatch } from 'react-redux'

// import { loaduserRequest } from './slices/AuthSlices'

function App() {
  // const dispatch=useDispatch()
  useEffect(()=>{
    Store.dispatch(loaduser())


  },[])
 

  return (
    <div className="App">
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  )
}

export default App
