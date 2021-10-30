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

productRouter.post('/', requireUser, async (req, res, next) => {
    const { productId, content = "" } = req.body;

    const productArr = productId.trim().split(/\s+/)
    const productData = { productId: req.user.id, productName, description, price, imageUrl, inStock, category };

    if (productArr.length) {
        productData.id = productArr;
    }

    try {
        const product = await createProduct(productData);
        if (product) {
            res.send({ p });
        } else {
            next({
                name: "AuthorizationError",
                message: "You're not logged in"
            })
        }

    } catch ({ name, message }) {
        next({ name, message });
    }
});

productRouter.patch('/:productId', requireUser, async (req, res, next) => {
    const { productId } = req.params;
    const {{ productId: req.user.id, productName, description, price, imageUrl, inStock, category } = req.body;

    const updateFields = {};

    if (productId && id.length > 0) {
        updateFields.productId = id.trim().split(/\s+/);
    }

    if (productName) {
        updateFields.productName = productName;
    }

    if (description) {
        updateFields.discription = discription;
    }

    if (price) {
        updateFields.price = price;
    }

    if (imageUrl) {
        updateFields.imageUrl = imageUrl;
    }
    
    if (inStock) {
        updateFields.inStock = inStock;
    }

    if (category) {
        updateFields.category = category;
    }

    try {
        const originalProduct = await getProductById(productId);

        if (originalProduct.user.id === req.user.id) {
            const updatedProduct = await updateProduct(productId, updateFields);
            res.send({ productId: updatedProduct })
        } else {
            next({
                name: 'UnauthorizedUserError',
                message: 'You cannot update a product that you did not create'
            })
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});
module.exports = productRouter;