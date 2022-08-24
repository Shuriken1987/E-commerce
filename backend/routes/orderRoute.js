const express = require('express');
const routes = express.Router();
const Orders = require('../models/orderModel');

routes.post('/ordered', async (req, res) => {
    let reqBody = req.body;
    const newOrder = new Orders(reqBody);
    const saveNewOrder = await newOrder.save();
    res.send(saveNewOrder);
});

routes.get('/get-orders', (req, res) => {
    Orders.find((error, data) => {
        if (error) {
            res.send("ERROR. TRY AGAIN.");
            return;
        }
        if (data) {
            res.send(data)
        } else {
            res.send("Product dont found")
        }
    })
})

module.exports = routes;