const Order = require('../models/order');
const User = require('../models/user');

const createOrder = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('name email')

        if(!user)   return res.status(400).json({msg: "User does not exist"})

        const {cart, orderId, address} = req.body;
        const {_id, name, email} = user;

        const newOrder = new Order({
            user_id: _id,
            name,
            email,
            orderId,
            address,
            cart,
            
        })
        
        await newOrder.save()
        
        return res.json({newOrder});
    }
    catch(err) {
        return res.status(500).json({msg: err.message})
    }
}


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } 
    catch (err) {
        res.status(500).json(err);
    }
}


const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({email: req.body.email});
        res.status(200).json(orders);
    } 
    catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {getAllOrders, createOrder, getMyOrders}