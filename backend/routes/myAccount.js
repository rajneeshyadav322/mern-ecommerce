const { getMyInfo, emptyCart, addToCart, getMyCart, updateCart } = require("../controllers/myAccount");
const { verifyToken } = require("../controllers/verifyToken");
const express = require('express')
const router = express.Router();

//Add Product into Cart
router.patch('/addcart', verifyToken, addToCart) 

router.post('/updateCart', verifyToken, updateCart) 

//empty cart 
router.put('/empty', verifyToken, emptyCart) 

// get my info
router.get('/info', verifyToken, getMyInfo)

// get my cart
router.post('/cart', verifyToken, getMyCart)


module.exports = router