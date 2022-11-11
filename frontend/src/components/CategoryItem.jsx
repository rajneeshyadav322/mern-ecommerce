import React from 'react'
import { Link, Navigate } from 'react-router-dom'


const CategoryItem = ({item}) => {
  return (
    <div className='relative border-2 mx-2 my-2 w-96'>
      <Link to={`/products`} state={{category: item.title}}>
        <div className=' absolute w-full h-full flex flex-col items-center justify-center top-0 left-0'>
        <div className='text-white text-3xl'>{item.title}</div>
        <button className='bg-white font-bold border-none hover:scale-110 rounded-md ease-in-out duration-500 p-2 mt-4'>Shop Now</button>
      </div>
        <img className='w-full h-full' src={item.img} alt="Unable to load image" />
      </Link>
    </div>
  )
}

export default CategoryItem