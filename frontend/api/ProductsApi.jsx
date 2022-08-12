import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ProductsApi = () => {


    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('');

    const getProducts = async () => {
        try {
            const res = await axios.get(
                category 
                ? `http://localhost:5000/api/products?category=${category}` 
                : 'http://localhost:5000/api/products')
            
            setProducts(res.data);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return {
        products: [products, setProducts],

    }
}

export default ProductsApi