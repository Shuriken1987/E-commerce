const express = require('express');
const routes = express.Router();
// const multer = require('multer');
// const path = require('path');
const cloudinary = require('../services/cloudinary');
const upload = require('../services/multer');
const Products = require('../models/productModel');
const {json} = require("express");

//IMAGE UPLOAD
// const storage = multer.diskStorage({
//     // destination: (req, file, callback) => {
//     //     callback(null, "../frontend/public/uploads/");
//     // },
//     filename: (req, file, callback) => {
//         callback(null, path.extname(file.originalname));
//     }
// });
// const upload = multer({storage: storage});

// Get all products
routes.get('/all-products', (req, res) => {
    Products.find((error, data) => {
        if (error) {
            console.log(error);
            res.send("ERROR. TRY AGAIN.");
            return;
        }
        if (data) {
            res.send(data)
        } else {
            res.send("Product dont found")
        }
    })
});
// Get random products
routes.get('/random-products/:numberOfAds', (req, res) => {
    let params = req.params.numberOfAds;
    Products.find((error, data) => {
        if (error) {
            console.log(error);
            res.send("ERROR. TRY AGAIN.");
            return;
        }
        if (data) {
            let copyData = [...data];
            let randAds = [];
            for (let i = 0; i < params; i++) {
                let rand = Math.floor(Math.random() * copyData.length);
                randAds.push(copyData[rand]);
                copyData.splice(rand, 1);
            }
            res.send(randAds);
        } else {
            res.send("Product dont found")
        }
    })
});
// Get product by ID
routes.get('/product/:productId', (req, res) => {
    const productId = req.params.productId;
    Products.findOne({_id: productId}, (err, data) => {
        if (err) {
            res.send("ERROR. Try again.")
        }
        if (data) {
            res.send(data)
        } else {
            res.send("Product not found")
        }
    })
});

// get searched products
routes.get("/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    Products.find({title: {$regex: searchTerm, "$options": "i"}}, (error, data) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        res.send(data);
    })
})
//Admin  delete product by Id
routes.delete("/admin/delete-product:id", async (req, res) => {
    // const params = req.params.id;
    try {
        let product = await Products.findById(req.params.id);
        await cloudinary.uploader.destroy(product.cloudinary_id);
        await product.remove();
        res.json(product);
    } catch (err) {
        console.log(err)
    }
});

//Admin update product
routes.put("/admin/update-product", upload.single("productImg"), async (req, res) => {
    try {
        const product = await JSON.parse(req.body.product);
        console.log(product)
        await cloudinary.uploader.destroy(product.cloudinary_id);
        const img = await cloudinary.uploader.upload(req.file.path);
        Products.updateOne({"_id": product._id}, {
            $set: {
                title: product.title,
                price: product.price,
                rating: product.rating,
                description: product.description,
                productImg: img.secure_url || product.productImg,
                cloudinary_id: img.public_id || product.cloudinary_id,
            }
        }, (err, data) => {
            if (err) {
                console.log(err);
                const errorMsg = `Error on updating product: ${err}`;
                res.send(errorMsg);
            } else {
                res.send(data);
            }
        });
    } catch (err) {
        console.log(err)
    }

});

//Admin add product
routes.post('/admin/add-product', upload.single("productImg"), async (req, res) => {
    const img = await cloudinary.uploader.upload(req.file.path);

    const newProduct = new Products({
        title: req.body.title,
        price: req.body.price,
        rating: req.body.rating,
        description: req.body.description,
        productImg: img.secure_url,
        cloudinary_id: img.public_id
    });
    Products.findOne(newProduct, async (err, data) => {
        if (err) {
            const errorMsg = `Error on adding product: ${err}`;
            res.status(416).send(errorMsg);
            return;
        }
        if (data)
            res.status(418).send(`Product already exists: ${data.title}`);
        else {
            const saveNewProduct = await newProduct.save();
            if (saveNewProduct) {
                res.send(saveNewProduct);
            } else {
                res.send('Product not added');
            }
        }
    })
})

module.exports = routes;