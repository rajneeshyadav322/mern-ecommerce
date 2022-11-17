const express = require('express');
const { payment, webhook } = require('../controllers/stripe');
const router = express.Router();



router.post('/payment', payment);

router.post('/webhook', express.raw({ type: 'application/json' }), webhook);

module.exports = router;