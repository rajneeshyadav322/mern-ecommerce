const Product = require("../models/product");

class APIFeatures {
  constructor(queryObj) {
    this.data = [];
    this.queryObj = queryObj;
  }

  async filterAndSort() {
    let sortObj = {};
    if (this.queryObj.sort == "newest") {
      sortObj = { createdAt: -1 };
    } else if (this.queryObj.sort == "oldest") {
      sortObj = { createdAt: 1 };
    } else if (this.queryObj.sort == "asc") {
      sortObj = { price: 1 };
    } else if (this.queryObj.sort == "desc") {
      sortObj = { price: -1 };
    }

    if(this.queryObj.category){
      this.queryObj.category = `\\b${this.queryObj.category}\\b`
    }
    else {
      this.queryObj.category= "."
    }

    if(this.queryObj.color){
      this.queryObj.color= `\\b${this.queryObj.color}\\b`
    }
    else {
      this.queryObj.color= "."
    }

    this.data = await Product.find({
      $and: [
        {
          categories: {
            $elemMatch: {
              $regex: this.queryObj.category,
            },
          },
        },
        {
          color: {
            $elemMatch: {
              $regex: this.queryObj.color,
            },
          },
        },
      ],
    }).sort(sortObj);
  }

  paginating() {
    // const page = this.queryString.page * 1 || 1;
    // const limit = this.queryString.limit * 1 || 8;
    // const skip = (page - 1) * limit;
    // this.query = this.query.skip(skip).limit(limit);
    // return this;
  }
}

const getAllProducts = async (req, res) => {
  try {
    // console.log(req.query)
    const features = new APIFeatures(req.query);
    await features.filterAndSort();

    const Products = features.data;

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

module.exports = {
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  getAllProducts,
};
