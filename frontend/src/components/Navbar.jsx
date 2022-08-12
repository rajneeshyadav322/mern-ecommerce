import React, { useContext } from 'react'
import { Search } from '@mui/icons-material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import Cart from '../pages/Cart';
import { GlobalState } from '../GlobalState';
import axios from 'axios';


const Navbar = () => {

    const state = useContext(GlobalState)

    const [isLogged] = state.userApi.isLogged;
    const [isAdmin] = state.userApi.isAdmin;
    const [cart] = state.userApi.cart;

    const logout = async () => {
        try {
            await axios.get('http://localhost:5000/api/auth/logout', {withCredentials:true})
            localStorage.clear();
            window.location.href = '/'
        }
        catch(err) {
            alert(err.response.message)
        }
    }

    const loggedRouter = () => {
        return (
            <>
                <Link to='/history'> <div className='cursor-pointer font-semibold hover:text-teal-700 mr-6'> HISTORY </div> </Link>
                <Link to='/'> <div className='cursor-pointer font-semibold hover:text-teal-700 mr-6' onClick={logout}> LOGOUT </div> </Link>
            </>
        )
    }


    return (
        <div className='relative md:px-6 p-2 md:py-2'>
            <div className='flex  items-center justify-between xsm:m-4'>
                <div className='flex items-center  justify-between'>
                    <div className='text-4xl text-center font-semibold mr-2'>E-Store</div>
                    <div className='border-2 sm:flex mx-2 hidden rounded-sm  p-2 border-black'>
                        <input type="text" placeholder='Search' className='text-lg  outline-none mr-1 border-none' />
                        <Search className='cursor-pointer'></Search>
                    </div>
                </div>
                <div className='flex justify-end items-center '>
                    <Link to='/'>
                        <div className='cursor-pointer font-semibold hover:text-teal-700 mr-6'>HOME</div>
                    </Link>
                    <Link to='/products'>
                        <div className='cursor-pointer font-semibold hover:text-teal-700 mr-6'>PRODUCTS</div>
                    </Link>

                    {
                    isLogged
                    ?
                    loggedRouter()
                    :
                    <>
                        <Link to='/register'>
                            <div className='cursor-pointer font-semibold hover:text-teal-700 mr-6'>REGISTER</div>
                        </Link>

                        <Link to='/login'>
                            <div className='cursor-pointer font-semibold  hover:text-teal-700 mr-6'>LOGIN</div>
                        </Link>
                    </>
                    }   
                    {
                    (isLogged)
                    ? 
                        <div className='cursor-pointer mr-2'>
                            <Link to='/cart'>
                                <Badge badgeContent={cart.length} color="primary">
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                            </Link>
                        </div>
                    :
                    ""
                    }
                </div>
            </div>
            <div className='flex sm:hidden justify-center'>
                <div className='relative border-2 p-2 flex justify-between mt-4 rounded-sm border-black'>
                    <input type="text" placeholder='Search' className='text-lg  outline-none border-none' />
                    <Search className=' absolute right-2 cursor-pointer'></Search>
                </div>
            </div>
        </div>

    )
}

export default Navbar