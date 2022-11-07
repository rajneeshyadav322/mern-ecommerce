const { getMyInfo, emptyCart, addToCart, getMyCart } = require("../controllers/myAccount");
const { verifyToken } = require("../controllers/verifyToken");
const express = require('express')
const router = express.Router();

//Add Product into Cart
router.patch('/addcart', verifyToken, addToCart) 

//empty cart
router.put('/empty', verifyToken, emptyCart) 

// get my info
router.get('/info', verifyToken, getMyInfo)

// get my cart
router.post('/cart', verifyToken, getMyCart)


module.exports = router