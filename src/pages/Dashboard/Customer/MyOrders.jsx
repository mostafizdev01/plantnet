import { Helmet } from 'react-helmet-async'
import CustomerOrderDataRow from '../../../components/Dashboard/TableRows/CustomerOrderDataRow'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import { axiosSecure } from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const MyOrders = () => {

  const { user } = useAuth();

  ////// get the plants details data from the database =============>>>>>>>>>>>>>>>>>>

  const { data = [], isLoading, refetch } = useQuery({ // first a dta jodi na pai taile undefind return kore na jno tar jonno data er default value ekta empty arrry korsi........
    queryKey: ['order', user.email],  // plants is unique key and id is refetch new data from display
    queryFn: async () => {
      const { data } = await axiosSecure(`/myoders/${user?.email}`)
      return data
    }
  })
   console.log(data);
   
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>My Orders</title>
      </Helmet>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Quantity
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data&&
                    data.map((order) => (
                      <CustomerOrderDataRow key={order._id} refetch={refetch} order={order} />
                    ))
                  }
                </tbody>
              </table>
              {!data.length ? <h2 className=' text-center py-5 text-xl text-black'>Your are not buying anything...</h2> : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyOrders
