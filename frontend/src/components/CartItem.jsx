import React, { useContext, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../axios/apis/cartApi';
import { getMyInfo } from '../redux/slices/mySlice';
// import { GlobalState } from '../GlobalState';

const CartItem = ({ item }) => {

    const dispatch = useDispatch()
    const {info, error, loading} = useSelector(store => store?.myReducer)

    const increment = async () => {
        await addToCart(item?.product)
        dispatch(getMyInfo())
    }

    const decrement = () => {
        removeFromCart()
    }

    const removeProduct = (id) => {
        // if(window.confirm("Do you want to delete this product!")) {
        //     cart.forEach((item, index) => {
        //         if(item._id === id) {
        //             cart.splice(index, 1);
        //         }
        //     })

        //     setCart([...cart])
        //     addToCart()
        // }
    }

    return (
        <div className='w-full'>
            <div className='flex flex-wrap justify-between my-6 w-full'>
                <div className='flex flex-wrap relative items-center p-2 border-2 w-full'>
                    <div onClick={() => removeProduct(item._id)} className='absolute top-0 cursor-pointer p-2 right-0'>
                        <CloseIcon />
                    </div>
                    <img className='w-40' src={item?.product?.image} alt="Product Image" />
                    <div className='flex flex-wrap justify-between flex-grow text-lg lg:text-xl ml-2 sm:ml-8'>
                        <div>
                            <div className=' '> <span className='font-semibold'>Product: </span>{item?.product?.title}</div>
                            <div className='mt-4'> <span className='font-semibold'>Description: </span>{item?.product?.desc}</div>
                            <div className='mt-4'> <span className='font-semibold'>Price: </span>₹ {item?.product?.price}</div>
                        </div>
                        <div className='flex justify-center flex-col items-center p-2 lg:mr-4'>
                            <div className='flex items-center justify-center ml-2'>
                                <button onClick={() => decrement(item._id)} className='px-2 border-2 font-semibold cursor-pointer text-2xl mr-2'> – </button>
                                <span className='text-2xl mr-2'>{item.quantity}</span>
                                <button onClick={() => increment(item._id)} className='px-2 border-2 font-semibold cursor-pointer text-2xl mr-2'> + </button>
                            </div>
                            <div className='mt-6 text-center text-3xl font-light'>₹ {item?.product?.price}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem