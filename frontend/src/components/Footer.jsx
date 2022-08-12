import React from 'react'
import { Email, Facebook, Instagram, Phone, Twitter } from '@mui/icons-material';


const Footer = () => {
  return (
    <footer className='bg-teal-100 mt-6'>
      <div className='mx-2 flex flex-wrap justify-between'>
        <div className='mt-4 flex flex-col py-2 px-4 md:w-1/3'>
          <div className='text-4xl '>E-Store</div>
          <div className='text-lg mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, voluptatem qui quasi saepe culpa in non, quia iusto dolorem atque porro odio cum possimus, nesciunt nostrum ut facilis dolor cupiditate.</div>
          <div className='flex my-2'>
            <div className='bg-violet-700 p-2 cursor-pointer rounded-full'>
              <Facebook className='text-white' />
            </div>
            <div className='bg-green-500 p-2 cursor-pointer rounded-full ml-4'>
              <Instagram className='text-white ' />
            </div>
            <div className='bg-violet-400 p-2 cursor-pointer rounded-full ml-4'>
              <Twitter className='text-white ' />
            </div>
          </div>
        </div>

        <div className='mt-4 flex flex-col py-2 px-4 md:w-1/3'>
          <div className='text-2xl'>Useful Links</div>
          <ul className='flex flex-wrap text-lg' >
            <li className='cursor-pointer w-1/2 mt-1'>Home</li>
            <li className='cursor-pointer w-1/2 mt-1'>Cart</li>
            <li className='cursor-pointer w-1/2 mt-1'>Man Fashion</li>
            <li className='cursor-pointer w-1/2 mt-1'>Woman Fashion</li>
            <li className='cursor-pointer w-1/2 mt-1'> Accessories</li>
            <li className='cursor-pointer w-1/2 mt-1'>My Account</li>
            <li className='cursor-pointer w-1/2 mt-1'>Terms</li>
            <li className='cursor-pointer w-1/2 mt-1'>Order Tracking</li>
          </ul>
        </div>

        <div className='mt-4 py-2 px-4 md:w-1/3'>
          <div className='text-2xl'>Contact</div>
          <div>
            <div className='mt-2 text-lg'>
              <Phone />
              <span className='ml-1'> +91 234567899 </span>
            </div>
            <div className='mt-1'>
              <Email />
              <span className='ml-1 text-lg'> rajneeshyadav.ry22@gmail.com  </span>
            </div>
          </div>
        </div>

      </div>

    </footer>
  )
}

export default Footer