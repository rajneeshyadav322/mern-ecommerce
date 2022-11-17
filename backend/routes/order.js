const express = require('express')
const { verifyTokenAndAuthorization, verifyAdmin, verifyToken } = require('../controllers/verifyToken')
const { createOrder, getAllOrders, getMyOrders } = require('../controllers/order');
const router = express.Router();


// Create 
router.post('/create', verifyToken, createOrder)


// GET ALL ORDERS 
router.get('/getAll', verifyToken, verifyAdmin, getAllOrders)


router.post('/history', verifyToken, getMyOrders)


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
