import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { GlobalState } from '../GlobalState'
import Loading from './Loading'
import ProductItem from './ProductItem'



const Products = ({ category, filter, sort }) => {

    const state = useContext(GlobalState);

    // Array destructuring
    const [products] = state.productsApi.products;
    
    
    return (
        <div>
            <div className='text-4xl mt-4 text-center font-extralight'>Products</div>
            {products.length === 0 && <Loading />}
            <div className='flex  flex-1 flex-wrap  mx-4 mt-6 justify-center xl:justify-between'>
                {products.map((item) => <ProductItem item={item} key={item._id} />)
                }
            </div>
        </div>
    )
}

export default Products