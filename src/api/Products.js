const express = require('express');
const productRouter = express.Router();
const { createProduct, getProductById, getProduct } = require('../db/users');
const { requireUser } = require('./utils');

productRouter.use((req, res, next) => {
    console.log("A request is being made to /products");

    next();
});

productRouter.get('/', async (req, res) => {
    try {
        const allProducts = await getAllProducts();

        res.send({
            products
        });
    } catch ({ name, message }) {
        console.log("productRouter.get message: ", message)
        next({ name, message });
    }
});
module.exports = productRouter;