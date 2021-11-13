const express = require('express');
//const { reset } = require('nodemon');
// const jwt = require('jsonwebtoken');
const { requireUser } = require('./utils');
const { getAllOrders, getCartByUser, createOrder } = require('../db');
const { addProductToOrder } = require('../db/orderProducts');
const checkoutRouter = require('./checkout');
const ordersRouter = express.Router();


//  USE /orders
ordersRouter.use((req, res, next) => {
    console.log('A request is being made to /orders');
    console.log('>>>>>>>>>', req.auth)
    next();
})

//  GET /orders 
ordersRouter.get('/', async (req, res, next) => {
    try {
        const orders = await getAllOrders();
        res.send(orders)
    } catch (error) {
        next(error);
    }
});

// GET /cart
ordersRouter.get('/cart', async (req, res, next) => { 
    try {
        if( req.auth )
        {
            const cart = await getCartByUser({ id: req.auth.id });
            res.send(cart)
        }
    } catch ({name, message}) {
        next({
            name: 'Cart Error',
            message: 'Nothing in cart'
        })
    }
});

// POST /orders 

ordersRouter.post('/', requireUser, async (req, res, next) => { 
    const { userId, status } = req.body;
    console.log('>>>> REQ', req.body)
    try { 
        const newCart = await createOrder({ userId, status});
        res.send( newCart );
    } catch ({name, message}) {
        next({ 
            name, message
        })
    }
})

ordersRouter.post('/:orderId/products', requireUser, async (req, res, next) => {
    const { productId, price, quantity } = req.body;
    const { orderId } = req.params;

    try { 
        const addProductsOnOrder = await addProductToOrder({productId, orderId, price, quantity});
        res.send(addProductsOnOrder)
    } catch ({name, message}) {
        next({name, message})
    }
})

ordersRouter.use( checkoutRouter );

module.exports = ordersRouter