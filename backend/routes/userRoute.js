const express = require('express');
const routes = express.Router();
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const Process = require("process");


// User login
routes.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const foundUser = Users.findOne({username}, (err, data) => {
        if (err) {
            const errorMsg = `Error on getting user from DB: ${err}`;
            res.status(416).send(errorMsg);
            return;
        }
        if (data && data.isActive === 'true') {
            bcrypt.compare(password, data.password, async (err, isMatch) => {
                if (isMatch) {
                    // data.token = generateToken(data._id);
                    res.send(data)
                } else
                    res.status(417).send('Wrong password.');
            })
        } else if (data && data.isActive === 'false') {
            res.status(401).send('Account is not activated, please check your email.');
        } else
            res.status(401).send('User not found.');
    });
});

// User register
routes.post('/register', async (req, res) => {
    const reqBody = req.body;
    Users.findOne(reqBody, async (err, data) => {
        if (err) {
            const errorMsg = `Error on register user: ${err}`;
            res.status(416).send(errorMsg);
            return;
        }

        if (data)
            res.status(418).send(`User already exists: ${data.username}`);
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(reqBody.password, salt);
            const newUser = new Users(reqBody);
            newUser.password = hashedPassword;
            const saveNewUser = await newUser.save();
            if (saveNewUser) {
                saveNewUser.token = generateToken(saveNewUser._id);
                res.send(saveNewUser);
                // console.log(saveNewUser.token)
            } else {
                res.send('User not registered');
            }

            let testAccount = await nodemailer.createTestAccount();

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "foodfloristhbg@gmail.com",
                    pass: process.env.GMAIL_PASS,
                },
            });

            let info = await transporter.sendMail({
                from: "foodfloristhbg@gmail.com", // sender address
                to: reqBody.email, // list of receivers
                subject: "Activate account", // Subject line
                text: "", // plain text body
                html: `
            <h1>Activate account</h1>
            <p>Dear, ${reqBody.username}</p>
            <p>Please click on link bellow to activate your account</p>
             <a href="https://food-florist-hbg.netlify.app/user-activate/${saveNewUser._id.toString()}">Activate link</a>
            `, // html body
            });
        }
    });
});

// Activate user
routes.post('/complete-registration', (req, res) => {
    const userId = req.body.userId;
    Users.updateOne({_id: userId}, {isActive: true}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});
// Update user by Id
routes.put("/profile", (req, res) => {
    let id = req.body._id;
    Users.updateOne({"_id": id}, {
        $set: {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            city: req.body.city,
            isAdmin: req.body.isAdmin
        }
    }, (err, data) => {
        if (err) {
            console.log(err);
            const errorMsg = `Error on updating user: ${err}`;
            res.send(errorMsg);
        } else {
            res.send(data);
        }
    })
});
// Get all users for admin
routes.get("/get-all-users", (req, res) => {
    Users.find((error, data) => {
        if (error) throw error;
        res.send(data);
    })
});
//delete user by id
routes.delete("/delete:id", (req, res) => {
    const params = req.params.id;
    Users.deleteOne({_id: params}, async (error) => {
        if (error) throw error;
        await res.send("User deleted");
    });
});

function validate(req, res, next) {
    let body = req.body;
    if (!body.username || !body.password) {
        res.send('Invalid username or password');
        return ''
    }
    next();
}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '10d',
    })
};

module.exports = routes;

