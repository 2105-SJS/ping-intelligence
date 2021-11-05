const express = require('express');
const order_productRouter = express.Router();
const { getOrderProductsById, addProductToOrder, updateOrderProduct, destroyOrderProduct } = require('../db/orderProducts');
const { getOrderById } = require('../db/orders');
const { requireUser } = require('./utils');


order_productRouter.use((req, res, next) => {
    console.log("A request is being made to /order_products");

    next();
});

order_productRouter.post('/', async (req, res, next) => {
    try {
        
    } catch (error) {
        throw error
    }

order_productRouter.patch('/:order_productId', requireUser, async (req, res, next) => {
    try {

    } catch (error) {
        throw error
    }

})

order_productRouter.delete('/Id', requireUser, async (req, res, next) => {
    try {
        const { Id } = req.params
        const userId = req.user.Id
        console.log('userId: ', userId)
        const orderProducts = await getOrderProductsById(Id)
        if ( orderProducts ) {
            const { orderId } = orderProducts;
            const order = await getOrderById(orderId);
            if ( orderProducts && order ) {
                const deleteProductId = await destroyOrderProduct(Id);
                if ( deleteProductId ) {
                    res.send({
                        name: 'Successful Deletion',
                        message: 'The product was deleted from your order'
                    })
                } else {
                    res.send({
                        name: 'Error Deleting Product',
                        message: 'There was an error while trying to delete the product from your order'
                    })
                }
            }
        }
    } catch (error) {
        throw error;
    }
});


module.exports = order_productRouter;