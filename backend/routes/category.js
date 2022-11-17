const router = require('express').Router()
const { getAllCategories, deleteCategory, createCategory, updateCategory } = require('../controllers/category')
const Category = require('../models/category')
const { verifyTokenAndAuthorization, verifyAdmin, verifyToken } = require('../controllers/verifyToken')


// GET ALL CATEGORIES
router.get('/', getAllCategories)


// CREATE CATEGORY
router.post('/create', verifyToken, verifyAdmin, createCategory)


// DELETE CATEGORY
router.delete('/:id', verifyToken, verifyAdmin, deleteCategory)


// UPDATE CATEGORY
router.put('/:id', verifyToken, verifyAdmin, updateCategory)




module.exports = router