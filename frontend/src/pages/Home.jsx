import React, { useContext } from 'react'
import Categories from '../components/Categories'
import Products from '../components/Products'

const Home = () => {

  return (
    <div>
      <Categories />
      <Products />
    </div>
  )
}

export default Home