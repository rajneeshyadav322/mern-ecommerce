import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { SearchOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import UserApi from '../../api/UserApi';
import { useContext } from 'react';
import { GlobalState } from '../GlobalState';

const ProductItem = ({item}) => {

  const state = useContext(GlobalState)
  const addCart = state.userApi.addCart

  return (
    <div className= 'relative w-96 m-2 bg-gray-100 hover:bg-gray-300  flex items-center justify-center p-4 '>
      <img className='w-full' src={(item.image)} alt="Unable to load image" />
      <div className='absolute justify-center items-center opacity-0 hover:opacity-100 w-full h-full flex flex-row p-4'>
        <div onClick={() => addCart(item)} className='bg-white mr-3 h-min hover:scale-110 hover:ease-in-out duration-200 cursor-pointer p-2 rounded-full'>
          <ShoppingCartOutlinedIcon />
        </div>
        <Link to={`/detail/${item._id}`}>
          <div className='bg-white p-2 h-min cursor-pointer hover:scale-110 hover:ease-in-out duration-200 rounded-full'>
            <SearchOutlined />   
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ProductItem