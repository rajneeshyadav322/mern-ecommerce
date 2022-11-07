import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../apiclient';

const ProductsApi = () => {


    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('');

    const getProducts = async () => {
        try {
            const res = await api.get(
                category 
                ? `/api/products?category=${category}` 
                : `/api/products`)
            
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