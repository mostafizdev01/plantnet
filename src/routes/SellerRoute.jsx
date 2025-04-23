import React from 'react'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useUserRole from '../hooks/useUserRole'
import { Navigate } from 'react-router-dom'

export default function SellerRoute({children}) {
      const [role, isLoading] = useUserRole()    
  
      if(isLoading) return <LoadingSpinner />
  
      if(role === 'seller') return children
      return <Navigate to={'/dashboard'} />
}
