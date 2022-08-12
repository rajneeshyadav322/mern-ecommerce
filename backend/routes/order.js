const express = require('express')
const { verifyTokenAndAuthorization, verifyAdmin, verifyToken } = require('./verifyToken')
const Order = require('../models/order');
const User = require('../models/user')
const router = express.Router();


// Create 
router.post('/create', verifyToken, async (req, res) => {
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
})


// GET ALL ORDERS 
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } 
    catch (err) {
        res.status(500).json(err);
    }
})


// // UPDATE
// router.put('/:id', verifyAdmin, async (req, res) => {

//     try {
//         const updatedOrder = await Order.findByIdAndUpdate(
//             req.params.id, 
//             {
//                 $set: req.body,
//             },
//             { new : true }
//         )
//         res.status(200).json(updatedOrder);
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// })


// // DELETE
// router.delete('/:id', verifyAdmin, async (req, res) => {
//     try {
//         await Order.findByIdAndDelete(req.params.id);
//         res.status(200).json('Order has been deleted.');
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// })



// // GET USER ORDERS
// router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
//     try {
//         const orders = await Order.find({ userId : req.params.userId });
//         res.status(200).json(orders);
//     } 
//     catch (err) {
//         res.status(500).json(err);
//     }
// })




// // GET INCOME
// router.get('/income', verifyAdmin , async (req, res) => {

//     const date = new Date();
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//     const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//     try {
//         const income = await Order.aggregate([
//             { $match : {createdAt : { $gte : prevMonth}}},
//             {
//                 $project : {
//                     month : { $month : "$createdAt"},
//                     sales : "$amount"
//                 },
//             },
//             {
//                 $group : {
//                     _id : "$month",
//                     total : {$sum : "$sales"},
//                 }
//             }
//         ]);
//         res.status(200).json(income);
//     } 
//     catch (err) {
//         res.status(500).json(err);
//     }
// })


module.exports = router;
