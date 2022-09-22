const express = require('express');
const routes = express.Router();
const Subscribe = require("../models/subscribeModel");
const Mailer = require("../services/mailService");

routes.put('/addToList', async (req, res) => {
    const reqBody = req.body
    Subscribe.findOne(reqBody, async (error, result) => {
        if (error) {
            const errMsg = "There was a problem adding you to subscription list., " + error
            res.send(errMsg)
            return
        }
        if (result) {
            res.send("You are already subscribed with this Е-mail: " + result.email)
        } else {
            let newSubscribe = new Subscribe(reqBody)
            let addSubscribe = await newSubscribe.save()
            let mailInfo = new Mailer({
                    recipient: reqBody.email,
                    subject: "Subscribtion to FoodFloristHelsingborg",
                    htmlString: `
                        <h2>Successfully subscribed</h2>
                        <p>If you want to unsubscribe click on the link below.</p>
                         <a href="https://food-florist-hbg.netlify.app/unsubscribe/${saveNewUser._id.toString()}">Activate link</a>
                        `
                }
            )
            mailInfo.sendMailToRecipient()
            res.send(addSubscribe ? "You are now subscribed!" : "You are not subscribed, something went wrong!")
        }
    })
})

routes.post('/unsubscribe', (req, res) => {
    const subscribeId = req.body.subscribeId
    Subscribe.deleteOne({_id: subscribeId}, (error) => {
        if (error) {
            res.send({isRemove: false, msg: error})
            return
        }
        res.send({isRemove: true, msg: "Successfuly unsubscribed"})
    })
})

routes.delete('/delete/:id', (req, res) => {
    const subscribeId = req.params.id
    Subscribe.deleteOne({_id: subscribeId}, (error) => {
        if (error) {
            res.send({isRemove: false, msg: error})
            return
        }
        res.send({isRemove: true, msg: "You've been' removed from subscribe list."})
    })
})


routes.get("/getAll", (req, res) => {
    Subscribe.find((error, result) => {
        if (error) {
            res.send(error)
            return
        }
        res.send(result)
    })
})

module.exports = routes