import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'


const Product = () => {

  const params = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [count, setCount] = useState(1)
  
  
  // const state = useContext(GlobalState);
  // const [products] = state.productsApi.products;
  // const addCart = state.userApi.addCart;

  const products = [];

  useEffect(() => {
    if(params.id) {
        products.forEach((product)=>{
        if(product._id === params.id)   setProductDetail(product);
      })
    }
  }, [params.id, products])

  return (
    <div>
        <div className='sm:my-20 my-8 sm:mx-6 flex flex-col sm:flex-row justify-between'>
            <div className='sm:basis-2/5 md:basis-1/2  flex justify-center items-center'>
                <img className=''  src= {productDetail.image} alt="Unable to load image" />
            </div>
            <div className='sm:basis-3/5 md:basis-1/2 mt-6 p-4'>
              <div className='text-6xl font-light'>{productDetail.title}</div>
              <div className='text-2xl mt-6'>{productDetail.desc}</div>
              <div className='text-4xl mt-6 font-thin'>₹ {productDetail.price}</div>
              <div className='flex items-center  mt-6'>
              </div>
              <div className='flex items-center justify-between mt-6'>
                <div>
                  <button onClick = {() => count>0 ? setCount(count - 1) : setCount(0)} className='hover:bg-black border-black hover:text-white font-semibold border-2 border-solid cursor-pointer text-3xl mr-2  px-2'>-</button>
                  <span className='text-2xl mr-2'>{count}</span>
                  <button onClick = {() => setCount(count + 1)}  className='hover:bg-black border-black hover:text-white font-semibold border-2 border-solid cursor-pointer text-3xl mr-2  px-2 '>+</button>
                </div>
                <button onClick={() => addCart(productDetail, count)} className='text-xl sm:mr-4 border-2 border-solid  hover:bg-black border-black hover:text-white font-semibold px-4 py-2'>Add to cart</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Product