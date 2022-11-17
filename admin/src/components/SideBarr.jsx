import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp';
import TimelineSharpIcon from '@mui/icons-material/TimelineSharp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const SideBarr = () => {
    return (
        <div className='hidden md:block'>
            <div className=' bg-gray-800 h-screen  w-60 text-white'>
                <div className='p-4'>
                    <div className='text-2xl mt-2'>Dashboard</div>
                    <ul className='text-lg px-2'>
                        <li className='mt-2 p-1 flex items-center '>
                            <HomeIcon className='mr-2'/>
                            <span className='cursor-pointer'>Home</span>
                        </li>
                        <li className='mt-2 p-1 flex items-center '>
                            <TimelineSharpIcon className='mr-2'/>
                            <span className='cursor-pointer'>Analytics</span>
                        </li>
                        <li className='mt-2 p-1 flex items-center '>
                            <TrendingUpSharpIcon className='mr-2'/>
                            <span className='cursor-pointer'>Sales</span>
                        </li>
                    </ul>
                </div>
                <div className='p-4'>
                    <div className='text-2xl'>Quick Menu</div>
                    <ul className='text-lg px-2'>
                    <li className='mt-2 p-1 flex items-center '>
                            <PersonOutlineOutlinedIcon className='mr-2'/>
                            <span className='cursor-pointer'>Users</span>
                        </li>
                        <li className='mt-2 p-1 flex items-center'>
                            <HomeIcon className='mr-2'/>
                            <span className='cursor-pointer'>Products</span>
                        </li>
                        <li className='mt-2 p-1 flex items-center '>
                            <CurrencyRupeeIcon className='mr-2'/>
                            <span className='cursor-pointer'>Transactions</span>
                        </li>
                        <li className='mt-2 p-1 flex items-center '>
                            <EqualizerIcon className='mr-2'/>
                            <span className='cursor-pointer'>Reports</span>
                        </li>
                    </ul>
                </div>
                <div className='hover:text-black hover:bg-white flex justify-center mx-10 py-2 rounded-md mt-4 bg-violet-500 duration-300 cursor-pointer text-xl'>
                    <button>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default SideBarr