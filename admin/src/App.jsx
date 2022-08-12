import React, { useState } from 'react'
import './app.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import SideBarr from './components/SideBarr';
import Home from './Pages.jsx/Home';



const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickSideBar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Navbar handleClickSideBar={handleClickSideBar} />
      <div className='flex '>
        <div className=''>
        <Sidebar isOpen={isOpen} />  
        </div>
        <div className=''>
          <SideBarr />
        </div>
        <div className='w-full'>
          <Home />
        </div>
      </div>
    </div>
  )
}

export default App
