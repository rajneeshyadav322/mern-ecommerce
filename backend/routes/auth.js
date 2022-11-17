const express = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../controllers/verifyToken');
const { logout, login, emptyCart, addToCart, register, refreshToken, getMyInfo } = require('../controllers/auth');


const router = express.Router();


// REGISTER
router.post('/register', register)


// REFRESH_TOKEN 
router.get('/refresh_token', refreshToken)


// LOGIN
router.post('/login', login)


// LOGOUT
router.get('/logout', logout)


module.exports = router;
