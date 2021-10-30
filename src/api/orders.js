
const express = require('express');
const orderRouter = express.Router();
const { createOrder, getOrderById, getAllOrders, getCartByUser, getOrdersByUser, getOrdersByProduct } = require('../db/users');
const { requireUser } = require('./utils');

orderRouter.use((req, res, next) => {
    console.log("A request is being made to /orders");

    next();
});

orderRouter.get('/orders', async (req, res) => {
    try {
        const allOrders = await getAllOrders();

        res.send({
            orders
        });
    } catch ({ name, message }) {
        console.log("orderRouter.get message: ", message)
        next({ name, message });
    }
});

orderRouter.get('/orders/cart', async (req, res) => {
    try {
        const allOrders = await getCartByUser();

        res.send({
            allOrders
        });
    } catch ({ name, message }) {
        console.log("orderRouter.get message: ", message)
        next({ name, message });
    }
});

orderRouter.post('/orders', async (req, res, next) => {
    try {
        const userOrders = await getOrdersByUser(req.body);
        res.send(userOrders);
    } catch (error) {
        next(error)
    }
});

orderRouter.get('/users/order:productId', async (req, res) => {
    try {
        const ordersByProduct = await getOrdersByProduct();

        res.send({
            ordersByUserId
        });
    } catch ({ name, message }) {
        console.log("orderRouter.get.users.orders.productId message: ", message)
        next({ name, message });
    }
});

orderRouter.get('/users/:userId/order', async (req, res) => {
    try {
        const ordersByUserId = await getOrdersByUser();

        res.send({
            ordersByUserId
        });
    } catch ({ name, message }) {
        console.log("orderRouter.get.users.userId message: ", message)
        next({ name, message });
    }
});
module.exports = orderRouter;