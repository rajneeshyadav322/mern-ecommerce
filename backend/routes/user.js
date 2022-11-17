const express = require('express')
const { verifyTokenAndAuthorization, verifyAdmin } = require('../controllers/verifyToken')
const CryptoJS = require('crypto-js');
const User = require('../models/user');
const { getAllUsers, getUserInfo, findUser, updateUserInfo, deleteUser } = require('../controllers/user');
const router = express.Router();

 
// UPDATE
router.put('/:id', verifyTokenAndAuthorization, updateUserInfo)


// DELETE
router.delete('/:id', verifyTokenAndAuthorization, deleteUser)


// GET
router.get('/find/:id', verifyAdmin, findUser)


// GET ALL USERS
router.get('/', verifyAdmin, getAllUsers)


// GET USER INFO
router.get('/stats', verifyAdmin, getUserInfo)


module.exports = router;
