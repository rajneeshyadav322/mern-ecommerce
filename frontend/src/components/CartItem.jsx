import React, { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { GlobalState } from '../GlobalState';
import axios from 'axios';

const CartItem = ({ item }) => {

    const state = useContext(GlobalState);
    const [cart, setCart] = state.userApi.cart;
    const [token] = state.token;





    const increment = (id) => {
        cart.forEach((item)=>{
            if(item._id === id) {
                item.quantity += 1;
            }
        })

        setCart([...cart])
        addToCart()
    }

    const decrement = (id) => {
        cart.forEach((item)=>{
            if(item._id === id && item.quantity>1) {
                item.quantity -= 1;
            }
        })

        setCart([...cart])
        addToCart()
    }

    const removeProduct = (id) => {
        if(window.confirm("Do you want to delete this product!")) {
            cart.forEach((item, index) => {
                if(item._id === id) {
                    cart.splice(index, 1);
                }
            })

            setCart([...cart])
            addToCart()
        }
    }


    const addToCart = async () => {

        await axios.patch('http://localhost:5000/api/auth/addcart', {cart}, {
            headers: {Authorization: token}
        })

    }


    return (
        <div className='w-full'>
            <div className='flex flex-wrap justify-between my-6 w-full'>
                <div className='flex flex-wrap relative items-center p-2 border-2 w-full'>
                    <div onClick={() => removeProduct(item._id)} className='absolute top-0 cursor-pointer p-2 right-0'>
                        <CloseIcon />
                    </div>
                    <img className='w-40' src={item.image} alt="Product Image" />
                    <div className='flex flex-wrap justify-between flex-grow text-lg lg:text-xl ml-2 sm:ml-8'>
                        <div>
                            <div className=' '> <span className='font-semibold'>Product: </span>{item.title}</div>
                            <div className='mt-4'> <span className='font-semibold'>Description: </span>{item.desc}</div>
                            <div className='mt-4'> <span className='font-semibold'>Price: </span>₹ {item.price}</div>
                        </div>
                        <div className='flex justify-center flex-col items-center p-2 lg:mr-4'>
                            <div className='flex items-center justify-center ml-2'>
                                <button onClick={() => decrement(item._id)} className='px-2 border-2 font-semibold cursor-pointer text-2xl mr-2'> – </button>
                                <span className='text-2xl mr-2'>{item.quantity}</span>
                                <button onClick={() => increment(item._id)} className='px-2 border-2 font-semibold cursor-pointer text-2xl mr-2'> + </button>
                            </div>
                            <div className='mt-6 text-center text-3xl font-light'>₹ {item.price*item.quantity}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem