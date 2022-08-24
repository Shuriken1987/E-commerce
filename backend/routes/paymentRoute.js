const express = require('express');
const routes = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SK);

routes.post('/create-payment-intent', async (req,res)=>{
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount * 100,
        currency: "sek",
        automatic_payment_methods: {
            enabled: true
        },
    })
    res.send(paymentIntent.client_secret);
});

module.exports = routes;