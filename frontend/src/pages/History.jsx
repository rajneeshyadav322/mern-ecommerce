import React from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import CartItem from '../components/CartItem';
import Loading from '../components/Loading';
import OrderItem from '../components/Order';
import { getMyInfo } from '../redux/slices/mySlice';
import { getOrders } from '../redux/slices/orderSlice';

const History = () => {

  const dispatch = useDispatch();

  const {orders, error, loading} = useSelector(store => store?.orderReducer)

  useEffect(() => {
    const email = localStorage.getItem('email')
    dispatch(getOrders(email))
  }, [])

  if(!!loading) {
    return <Loading/>
  }

  if(orders.length === 0) {
    return (
      <div className="text-6xl text-center py-20 h-screen">
        No Orders yet.
      </div>
    );
  }

  return (
    <div className='mx-12 flex flex-wrap gap-8 my-12' style={{minHeight: "70vh"}}>
      {
        orders?.map(item => <OrderItem key={item._id} item={item}/>)
      }
    </div>
  )
}

export default History