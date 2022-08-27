// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
// const nodemailer = require('nodemailer');
// const dbConfig = require('./config/dbConfig');
const connectDB = require('./config/db');
const serverConfig = require("./config/serverConfig");
// const Users = require('./models/userModel');
// const Products = require('./models/productModel');
const userRoute = require('./routes/userRoute');
const productsRoute = require('./routes/productsRoute');
const paymentRoute = require('./routes/paymentRoute');
const clients = require('./models/testimonialClients.json');
const subscribeRoute = require('./routes/subscribeRoute');
const commentsRoute = require('./routes/commentRoute');
const ordersRoute = require('./routes/orderRoute');


connectDB();
const app = express();

// mongoose.connect(dbConfig.MONGODB_URL)
//     .then((data) => console.log("MONGO DB is connected."))
//     .catch((err) => console.log(`${err}`));

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





// getting clients from models/clients.json
app.get("/api/home", (req, res) => {
    res.send(clients);
});

// //Serve frontend
// if (process.env.NODE_ENV  === 'development'){
//     app.use(express.static(path.join(__dirname, '../frontend/build')))
//
//     app.get('*', (req,res)=> res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
// }else{
//     app.get('/', (req,res)=> res.send('Set to production'))
// }

//ServerConfig
app.listen(serverConfig.port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(serverConfig.serverRunningMsg);
    }
});
