import React, { useContext } from 'react'
import { useEffect } from 'react';
import { GlobalState } from '../GlobalState'

const Success = () => {

  const state = useContext(GlobalState);
  const [cart, setCart] = state.userApi.cart;
  const emptyCart = state.userApi.emptyCart;

  setCart([])
  emptyCart()


  return (
    <div>
        <div className='text-5xl  text-center my-8'>Thanks for your order.</div>
    </div>
  )
}

export default Success