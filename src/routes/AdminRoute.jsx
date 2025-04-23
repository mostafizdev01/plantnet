import React from 'react'
import useUserRole from '../hooks/useUserRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import { Navigate } from 'react-router-dom'

export default function AdminRoute({children}) {
    const [role, isLoading] = useUserRole()    

    if(isLoading) return <LoadingSpinner />

    if(role === 'admin') return children
    return <Navigate to={'/dashboard'} />
}
