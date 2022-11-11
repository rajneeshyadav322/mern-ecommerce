import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Categories from '../components/Categories'
import Products from '../components/Products'
import { getProducts } from '../redux/slices/productsSlice'

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div>
      <Categories />
      <Products />
    </div>
  )
}

export default Home