import React from 'react'

const FeaturedInfo = () => {
  return (
    <div className='flex flex-wrap text-white justify-center'>
        <div className='  p-6 m-4 w-96 shadow-gray-200 rounded-lg bg-violet-500 shadow-xl'>
            <div className='text-2xl font-light'>Revenue</div>
            <div className='text-4xl my-2 '>₹ 20034</div>
        </div>
        <div className=' p-6 m-4 w-96 shadow-gray-200 rounded-lg bg-violet-500 shadow-xl'>
            <div className='text-2xl font-light'>Sales</div>
            <div className='text-4xl my-2 '>₹ 40034</div>
        </div>
        <div className=' p-6 m-4 w-96 shadow-gray-200 rounded-lg bg-violet-500 shadow-xl'>
            <div className='text-2xl font-light'>Registered Users</div>
            <div className='text-4xl my-2 '>20</div>
        </div>
        <div className='p-6 m-4 w-96 shadow-gray-200 rounded-lg bg-orange-400 shadow-xl'>
            <div className='text-2xl font-light'>Total Orders</div>
            <div className='text-4xl my-2 '>20</div>
        </div>
        <div className='p-6 m-4 w-96 shadow-gray-200 rounded-lg bg-orange-400 shadow-xl'>
            <div className='text-2xl font-light'>Pending Orders</div>
            <div className='text-4xl my-2 '>20</div>
        </div>
        <div className=' p-6 m-4 w-96 shadow-gray-200 rounded-lg  bg-orange-400 shadow-xl'>
            <div className='text-2xl font-light'>Delivered </div>
            <div className='text-4xl my-2 '>20</div>
        </div>
    </div>
  )
}

export default FeaturedInfo