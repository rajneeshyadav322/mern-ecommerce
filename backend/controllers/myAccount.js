const User = require("../models/user");
const Product = require("../models/product");
const cart = require("../models/cart");
const user = require("../models/user");

const getMyInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("products.product").select('-password')
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateCart = async (req, res) => {
  try{
    if(req.body == {})  return res.status(400).json({msg: "User id not found"})

    const user = await User.findById(req.body?._id);

    if(!user) return res.status(400).json({msg: "User does not exist."})

    const obj = req.body.products.map(item => {
      return {
        product: item.product._id,
        quantity: item.quantity,
        _id: item._id,
      }
    })

    await User.findOneAndUpdate(
      {_id: req.body._id },
      {
        products: obj,
        subTotal: req.body.subTotal
      })

    return res.status(200).json({msg: "Cart Updated Successfully"})
  }
  catch(error) {
    return res.status(500).json({msg: error.message})
  }
}

const emptyCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);

    if (!user) return res.status(400).json({ msg: "User does not exist." });

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        cart: req.body.cart,
      }
    );

    return res.status(200).json({ msg: "Removed items from the cart" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const products = user.products;

    if (products !== undefined) {
      let found = false;
      for (let obj of products) {
        if (obj.product == req.body._id) {
          obj.quantity += 1;
          found = true;
          break;
        }
      }

      if (!found) {
        products.push({
          product: req.body._id,
          quantity: 1,
        });
      }
    } else {
      products.push({
        product: req.body._id,
        quantity: 1,
      });
    }

    user.subTotal += req.body.price;

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        products: products,
        subTotal: user.subTotal
      }
    );

    return res.status(201).json({ msg: "Added to the cart" }); 
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getMyCart = async (req, res) => {
  try {

    const data = await user.findById(req.body._id).populate("products.product")

    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { getMyInfo, addToCart, emptyCart, getMyCart, updateCart };
