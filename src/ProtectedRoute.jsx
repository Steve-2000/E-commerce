import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loader from './utilities/Loader'

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useSelector(state => state.authState)

    if(loading){
        <Loader/>
    }

    if (!isAuthenticated && !loading) {
        return <Navigate to="/login" />
    }


    if (isAuthenticated && !loading) {
        return children
    }
    return null;
}
