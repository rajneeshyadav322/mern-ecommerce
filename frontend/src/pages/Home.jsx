import React, { useContext } from 'react'
import Categories from '../components/Categories'
import Products from '../components/Products'
import { GlobalState } from '../GlobalState'
import Loading from '../components/Loading'

const Home = () => {

  const value = useContext(GlobalState)

  return (


    <div>
      <Categories />
      <Products />
    </div>
  )
}

export default Home