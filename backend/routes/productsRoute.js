const express = require('express');
const routes = express.Router();
const multer = require('multer');
const Products = require('../models/productModel');

//IMAGE UPLOAD
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../frontend/public/uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({storage: storage});

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
routes.delete("/admin/delete-product:id", (req, res) => {
    const params = req.params.id;
    Products.deleteOne({_id: params}, async (error) => {
        if (error) throw error;
        await res.send("Product deleted");
    });
});

//Admin update product
routes.put("/admin/update-product", upload.single("productImg"), (req, res) => {
    const product = JSON.parse(req.body.product);
    console.log(product)
    Products.updateOne({"_id": product._id}, {
        $set: {
            title: product.title,
            price: product.price,
            rating: product.rating,
            description: product.description,
            productImg: req.file.originalname
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
});

//Admin add product
routes.post('/admin/add-product', upload.single("productImg"), (req, res) => {
    // const reqBody = req.body;
    const newProduct = new Products({
        title: req.body.title,
        price : req.body.price,
        rating: req.body.rating,
        description: req.body.description,
        productImg: req.file.originalname
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
            // const newProduct = new Products(reqBody);
            const saveNewProduct = await newProduct.save();
            if (saveNewProduct){
                res.send(saveNewProduct);
            }else{
                res.send('Product not added');
            }
        }
    })
})

module.exports = routes;