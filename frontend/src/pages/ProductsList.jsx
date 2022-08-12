import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Products from '../components/Products'
import { MenuItem, Select } from '@mui/material'

const ProductsList = () => {

  const location = useLocation();
  const category = location.pathname.split('/')[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    })
  }


  return (
    <div>
      <div className='flex mt-8 flex-wrap justify-between mx-4 text-3xl'>
        <div className=' flex flex-col ' >
          <span className='ml-2'>Filters</span>
          <div className='flex flex-col xsm:flex-row'>
            <Select displayEmpty name='category' onChange={handleFilters} className='mr-2 mt-2 w-18 h-11' >
              <MenuItem disabled selected>Category</MenuItem>
            </Select>
            <Select displayEmpty name='color' onChange={handleFilters} className='w-18 mt-2 h-11' >
              <MenuItem disabled selected>Color</MenuItem>
              <MenuItem value={"Red"} >Red</MenuItem>
              <MenuItem value={"Blue"} >Blue</MenuItem>
              <MenuItem value={"Black"} >Black</MenuItem>
              <MenuItem value={"White"}>White</MenuItem>
            </Select>
          </div>
         
        </div>
        <div className='ml-4 flex flex-col'>
          <span className='ml-2'>Sort</span>
          <Select displayEmpty defaultValue={"newest"} onChange={e => setSort(e.target.value)} className='w-18 mt-2 h-11' >
            <MenuItem value={"newest"}>Newest</MenuItem>
            <MenuItem value={"oldest"}>Oldest</MenuItem>
            <MenuItem value={"asc"} >Price (aesc) </MenuItem>
            <MenuItem value={"desc"} >Price (desc)</MenuItem>
          </Select>
        </div>
      </div>
      <Products category={category} filter={filter} sort={sort}/>

    </div>
  )
}

export default ProductsList