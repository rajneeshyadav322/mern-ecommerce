const Order = require("../models/order");
const User = require("../models/user");
const stripe = require("stripe")(process.env.STRIPE_SEC);
const dotenv = require("dotenv");

const payment = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.user_id,
        products: JSON.stringify(req.body.products),
      },
    });

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      line_items: [...req.body.products],
      customer: customer.id,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json(session.url);
  } catch (err) {
    return res.json(err);
  }
};

const createOrder = async (customer, data) => {
  console.log("customer", customer);
  console.log("data", data);
  const products = JSON.parse(customer.metadata.products);

  const newOrder = new Order({
    userId: customer.metadata.userId,
    name: data.shipping.name,
    email: customer.email,
    paymentId: data.id,
    address: data.shipping.address,
    products: products,
    total: data.amount / 100,
    status: data.status,
  });

  try {
    await newOrder.save();
  } catch (err) {
    res.json({ err });
  }
};


const emptyCart = async (customer) => {
  try {
    await User.findByIdAndUpdate(customer.metadata.userId, {
      products: [],
      subTotal: 0
    })
  }
  catch(error) {
    console.log(error.message)
  }
}

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.ENDPOINT_SECRET;
const webhook = (request, response) => {
  const sig = request.headers["stripe-signature"];
  console.log("webhook called")

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
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
    console.log(`Webhook Verified: `, event);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  data = event.data.object;
  eventType = event.type;

  console.log(eventType)

  // handle the event
  if (eventType === "payment_intent.succeeded") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        createOrder(customer, data);
        emptyCart(customer)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
};

module.exports = { createOrder, payment, webhook };
