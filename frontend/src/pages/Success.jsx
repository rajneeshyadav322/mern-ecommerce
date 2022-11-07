import React, { useContext } from 'react'
import { useEffect } from 'react';


const Success = () => {
  
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