const express = require('express');
const productRouter = express.Router();
const { createProduct, getProductById, getAllProducts } = require('../../db');
const { requireUser } = require('./utils');


productRouter.use((req, res, next) => {
    console.log("A request is being made to /products");

    next();
});

productRouter.get('/products', async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();

        res.send({
            allProducts
        });
    } catch ({ name, message }) {
        console.log("productRouter.get message: ", message)
        next({ name, message });
    }
});

productRouter.get('/products/:productId', async (req, res, next) => {
    try {
        const allProductsById = await getAllProducts({id});

        res.send({
            allProductsById
        });
    } catch ({ name, message }) {
        console.log("productRouter.get message: ", message)
        next({ name, message });
    }
});

productRouter.post('/orders/:orderId/products', async (req, res, next) => {
    const { orderId, userId, datePlaced, status, order_product } = req.body;
    const data = { orderId, userId, datePlaced, status, order_product }
    try {
        const activity = await createOrder(data);
        res.send(activity)
    } catch (error) {
        next(error);
    }
});

productRouter.patch('/order_products/:orderProductId', requireUser, async (req, res, next) => {
    const { order_products } = req.params;
    const { isPublic, productId, productName, description, price, imageUrl, inStock, category } = req.body;
    const updateFields = {}
    if (isPublic) {
        updateFields.isPublic = isPublic
    }
    if (productId) {
        updateFields.id = productId;
    }
    if (productName) {
        updateFields.productName = productName;
    }
    if (description) {
        updateFields.descritption = description;
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
        const originalProduct = await getOrderProductById(productId);
        if (originalProduct.id = Number(productId)) {
            const updatedProduct = await updateProduct(updateFields);
            res.send(updatedProduct);
        } else {
            next({
                name: 'Error',
                message: 'Cannot update the product.'
            })
        }
    } catch (error) {
        next(error)
    }
})

productRouter.delete('/order_products/:orderProductId', requireUser, async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await getOrderProductById(productId);

        if (product.creatorId === req.user.id) {
            const deleteProduct = await destroyProduct(product.id);
            res.send(deleteProduct)
        }
    } catch (error) {
        next(error);
    }
})
module.exports = productRouter;