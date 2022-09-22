const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const dbConfig = require('./config/dbConfig');
const serverConfig = require("./config/serverConfig");
const userRoute = require('./routes/userRoute');
const productsRoute = require('./routes/productsRoute');
const paymentRoute = require('./routes/paymentRoute');
const subscribeRoute = require('./routes/subscribeRoute');
const commentsRoute = require('./routes/commentRoute');
const ordersRoute = require('./routes/orderRoute');
const contactRoute = require('./routes/contactRoute');
const testimonialRoute = require('./routes/testimonialRoute');

const app = express();

mongoose.connect(dbConfig.MONGODB_URL)
    .then((data) => console.log("MONGO DB is connected."))
    .catch((err) => console.log(`${err}`));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
// enable CORS - API calls and resource sharing
app.use(cors());

// Routes
app.use("/api/user",userRoute);
app.use("/api/products", productsRoute);
app.use('/api/payment', paymentRoute);
app.use("/api/subscribe", subscribeRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/contact", contactRoute);
app.use("/api/testimonial", testimonialRoute);

//ServerConfig
app.listen(serverConfig.port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(serverConfig.serverRunningMsg);
    }
});
