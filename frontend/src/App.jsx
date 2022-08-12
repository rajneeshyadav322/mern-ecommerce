import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import "./app.css"
import Products from './components/Products'
import Product from './pages/Product'
import Register from './pages/Register'
import Login from "./pages/Login"
import Cart from './pages/Cart'
import ProductsList from './pages/ProductsList'
import Categories from './components/Categories'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { DataProvider } from './GlobalState'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import History from './pages/History'
import Success from './pages/Success'
import Cancel from './pages/Cancel'


const App = () => {

  return (
    <DataProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products/' element={<ProductsList />} />
        <Route path='/cart' element={<Cart/>}> </Route>
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/register' element={<Register/>}> </Route>
        <Route path='/detail/:id' element={<Product/>} />
        <Route path='/history' element={<History/>}></Route>
        <Route path='/success' element={<Success />} /> 
        <Route path='cancel' element={<Cancel/>} />

        <Route path='*' exact element={<NotFound/>}> </Route>
      </Routes>
      <Footer />
    </DataProvider>
  )
}

export default App