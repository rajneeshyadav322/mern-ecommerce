import React, { useState } from 'react'
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const Navbar = ({handleClickSideBar}) => {

    return (
        <div className='sticky top-0 z-[50] bg-white'>
            <div className='flex  justify-between items-center p-2 mx-4'>
                <div className='md:hidden'>
                    <DensityMediumIcon className='cursor-pointer' onClick={handleClickSideBar}/>
                </div>
                <div className='text-4xl '>Admin</div>
                <img className='w-10 rounded-full cursor-pointer' src="https://media-exp1.licdn.com/dms/image/C5603AQHNUVgRjFi5Yw/profile-displayphoto-shrink_400_400/0/1647766418218?e=1660176000&v=beta&t=L_wwizxpF6-y32xA9lBHqE4iTbqMMSmVpuSLNO3IPt4" alt="Avatar" />
            </div>

        </div>
    )
}

export default Navbar