const Product = require("../models/product");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["sort", "filter", "limit"];
    excludedFields.forEach((e) => delete queryObj[e]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 8;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

const getAllProducts = async (req, res) => {
  try {
    const features = new APIFeatures(Product.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const Products = await features.query;
    // console.log(Products)
    return res.status(200).json(Products);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const createProduct = async (req, res) => {
  try {
    const Product = await Product.findOne({ ProductId: req.body.ProductId });

    if (!req.body.image) return res.status(400).json("No image upload");

    if (Product)
      return res
        .status(400)
        .json({ msg: "Product already exists with this id." });

    const newProduct = new Product(req.body);
    await newProduct.save();
    return res.status(200).json("Product Created Successfully");
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (!req.body.image) return res.status(400).json("No image upload");

    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(200).json("Product Updated Successfully");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!req.body.image) return res.status(400).json("No image upload");

    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(200).json("Product Updated Successfully");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const Product = await Product.findById(req.params.id);

    if (!Product)
      return res.status(400).json({ msg: "Product does not exists" });

    return res.status(200).json(Product);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};


module.exports = {getProduct, deleteProduct, updateProduct, createProduct, getAllProducts}