const express = require('express');
const routes = express.Router();
const Testimonial = require('../models/testimonialClients.json');

// getting clients from models/clients.json
routes.get("/clients-word", (req, res) => {
    res.send(Testimonial);
});

module.exports = routes;