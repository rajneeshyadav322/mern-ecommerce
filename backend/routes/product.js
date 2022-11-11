const express = require('express')
const { verifyTokenAndAuthorization, verifyToken, verifyAdmin } = require('../controllers/verifyToken')
const Product = require('../models/product');
const { getAllProducts, updateProduct, createProduct, deleteProduct, getProduct } = require('../controllers/product');
const router = express.Router();



// GET ALL PRODUCTS
router.get('/get', getAllProducts)

// Create 
router.post('/', verifyToken, verifyAdmin, createProduct)

// UPDATE
router.put('/:id', verifyToken, verifyAdmin, updateProduct)

// DELETE
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct)

// GET PRODUCT
router.get('/find/:id', getProduct)

module.exports = router;
