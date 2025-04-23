import React from 'react'
import useUserRole from '../hooks/useUserRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import { Navigate } from 'react-router-dom'

export default function CustomerRoute({children}) {
    const [role, isLoading] = useUserRole()    

    if(isLoading) return <LoadingSpinner />

    if(role === 'customer') return children
    return <Navigate to={'/dashboard'} />
}
