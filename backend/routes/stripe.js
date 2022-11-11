const express = require('express');
const Order = require('../models/order');
const stripe = require('stripe')(process.env.STRIPE_SEC)
const router = express.Router();
const dotenv = require('dotenv')


router.post('/payment', async (req, res) => {

    try {
        const customer = await stripe.customers.create({
            metadata: {
                userId: req.body.user_id,
                products: JSON.stringify(req.body.products)
            }
        })


        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['IN'],
            },
            line_items: [
                ...req.body.products
            ],
            customer: customer.id,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        createOrder(customer, data)

        res.json(session.url);
    }
    catch(err) {
        return res.json(err);
    }
});


const createOrder = async (customer, data) => {
    const products = JSON.parse(customer.metadata.products);

    console.log(customer)
    const newOrder = new Order({
        userId: customer.metadata.userId,
        name: data.customer_details.name,
        email: data.customer_details.email,
        paymentId: data.payment_intent,
        address: data.customer_details.address,
        products: products,
        total: data.amount_total/100,
        status: data.payment_status
    })

    try {
        await newOrder.save();
    }
    catch(err) {
        res.json({err})
    }
}



// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.ENDPOINT_SECRET;

router.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let data;
    let eventType;
    let event;
    
    const payload = request.body;
      const payloadString = JSON.stringify(payload, null, 2);
      const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret,
      });
    
      try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
        console.log(`Webhook Verified: `, event);
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
    data = event.data.object
    eventType = event.type
    
    // handle the event
    if(eventType === 'checkout.session.completed') {
        stripe.customers.retrieve(data.customer)
        .then((customer)=> {

            console.log("asdasdasdasdashvasghadvhfbashbd")

            createOrder(customer, data)
        }).catch((err) => {
            console.log(err.message)
        }) 
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
});

module.exports = router;