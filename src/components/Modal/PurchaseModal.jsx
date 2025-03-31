/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const PurchaseModal = ({ closeModal, isOpen, data, refetch }) => {
  // Total Price Calculation
  const { user } = useAuth();
  const { name, price, quantity, category, imageUrl, sellerInfo, _id } = data
  const [ordersAddress, setOrdersAddress] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [plantsPrice, setPlantsPrice] = useState(0);
  const navigate = useNavigate()
  console.log(data)
  // Which the order quantity ================>>>>>>>>>>>>
  
  const handleQuantity = value => {
    if (value > quantity) {
      toast.error("Insufficient quantity!");
      return;
    }
    if (value < 1) {
      setOrderQuantity(1)
      toast.error("Minimum order quantity is 1!");
      return;
    }

    setOrderQuantity(value);
    setPlantsPrice(price * value)
    setOrdersInfo(prev => {
      return { ...prev, totalPrice: price * value, quantity: value }
    })
  }

  
  // if the user is true then i get user information and set post the database

  const [ordersInfo, setOrdersInfo] = useState({
    userInfo: {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL
    },
    plantId: _id,
    name,
    category,
    imageUrl,
    sellerInfo: sellerInfo,
    address: ordersAddress,
    totalPrice: price,
    quantity: orderQuantity,
    status: 'pending'
  })


  // post the orders data in database==============>>>>>>>>>>>>>>>>>>>>

  const handlePurchase = async () => {
    try{
      await axiosSecure.post('/order', ordersInfo)
      // decrease the quantity from the plants collection
      await axiosSecure.patch(`/plants/quantity/${_id}`, {quantityToUpdate: orderQuantity})
      toast.success("Your order has been successfully!");
      refetch(); // refresh the plants list
      navigate('/dashboard/my-orders') // go to orders page after purchase
    }catch(err){
      console.error(err)
      toast.error("Failed to purchase!");
    }finally{
      closeModal();
    }
  }


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Orders Froms
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Plant: {name}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Category: {category}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Customer: {user?.displayName}</p>
                </div>

                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Price: ${price}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Available Quantity: {quantity}</p>
                </div>
                {/* purchase quantity amount */}
                <div className='mt-2 flex items-center space-x-2'>
                  <p className='text-sm text-gray-500'>Quantity:</p>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                    name='price'
                    type='number'
                    onChange={(e) => handleQuantity(e.target.value)}
                    defaultValue={orderQuantity}
                    required
                    max={quantity}
                  />
                </div>
                {/* Shiping address....... */}

                <div className='mt-2 flex items-center space-x-2'>
                  <p className='text-sm text-gray-500'>Address:</p>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                    name='address'
                    type='text'
                    onChange={(e) => setOrdersInfo(prev => {
                      return { ...prev, address: e.target.value }
                    })}
                    placeholder='Shiping address...'
                    required
                    max={quantity}
                  />
                </div>

                {/* Confirm order button */}

                <div className='mt-5 text-end'>
                  <button onClick={handlePurchase} className=' btn btn-neutral text-white w-full'>{plantsPrice > 0 ? `$ ${plantsPrice}` : ''} Pay Now</button>
                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PurchaseModal
