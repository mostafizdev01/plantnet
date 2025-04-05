import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query'

export default function useUserRole() {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    const {data, isLoading} = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async ()=> {
            const { data } = await axiosSecure(`/users/role/${user?.email}`)
            return data
            
        }
    })
  return [data, isLoading]
}
