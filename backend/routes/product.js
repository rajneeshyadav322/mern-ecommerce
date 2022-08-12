const express = require('express')
const { verifyTokenAndAuthorization, verifyToken, verifyAdmin } = require('./verifyToken')
const Product = require('../models/product');
const router = express.Router();

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = {...this.queryString};

        const excludedFields = ['sort', 'filter', 'limit'];
        excludedFields.forEach(e => delete(queryObj[e]))

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr));
        
        return this;
    }

    sorting() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
           this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page*1 || 1;
        const limit = this.queryString.limit*1 || 8;
        const skip = (page-1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

}


// GET ALL PRODUCTS
router.get('/', async (req, res) => {

    try {
        const features = new APIFeatures(Product.find(), req.query)
                                .filtering()
                                .sorting()
                                .paginating();

        const products = await features.query;

        return res.status(200).json(products);
    } 
    catch (err) {
        return res.status(500).json(err);
    }
})



// Create 
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
    
    try {
        const product = await Product.findOne({productId: req.body.productId});

        if(!req.body.image)  return res.status(400).json("No image upload")

        if(product)     return res.status(400).json({msg: "Product already exists with this id."})

        const newProduct = new Product(req.body);
        await newProduct.save();
        return res.status(200).json("Product Created Successfully");
    }
    catch(err) {
        return res.status(500).json({msg: err.message})
    }
})


// UPDATE
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {

    try {

        if(!req.body.image)  return res.status(400).json("No image upload")


        await Product.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
            },
            { new : true }
        )

        return res.status(200).json("Product Updated Successfully");
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
})


// DELETE
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json('Product has been deleted.');
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
})



// GET PRODUCT
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product)    return res.status(400).json({msg: "Product does not exists"})

        return res.status(200).json(product);
    } 
    catch (err) {
        return res.status(500).json(err.message);
    }
})




module.exports = router;
