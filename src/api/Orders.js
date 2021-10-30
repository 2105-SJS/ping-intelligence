const express = require('express');
const orderRouter = express.Router();
const { createOrder, getOrderById, getOrdersByProduct, getOrdersByUser, getAllOrders } = require('../db/users');
const { requireUser } = require('./utils');

ordersRouter.use((req, res, next) => {
    console.log("A request is being made to /orders");

    next();
});

ordersRouter.get('/', async (req, res) => {
    try {
        const allOrders = await getAllOrders();

        res.send({
            orders
        });
    } catch ({ name, message }) {
        console.log("ordersRouter.get message: ", message)
        next({ name, message });
    }
});

ordersRouter.post('/', requireUser, async (req, res, next) => {
    const { orderId, content = "" } = req.body;

    const orderArr = orderId.trim().split(/\s+/)
    const orderData = { orderId: req.user.id, userId, datePlaced, status };

    if (orderArr.length) {
        orderData.orderId = orderArr;
    }

    try {
        const order = await createOrder(orderData);
        if (order) {
            res.send({ o });
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

ordersRouter.patch('/:orderId', requireUser, async (req, res, next) => {
    const { orderId } = req.params;
    const {{ orderId: req.user.id, orderId, userId, datePlaced, status } = req.body;

    const updateFields = {};

    if (orderId && orderId.length > 0) {
        updateFields.orderId = orderId.trim().split(/\s+/);
    }

    if (userId) {
        updateFields.userId = userId;
    }

    if (datePlaced) {
        updateFields.datePlaced = datePlaced;
    }

    if (status) {
        updateFields.status = status;
    }

    try {
        const originalOrder = await getOrderById(orderId);

        if (originalOrder.user.id === req.user.id) {
            const updatedOrder = await updateOrder(orderId, updateFields);
            res.send({ orderId: updatedOrder })
        } else {
            next({
                name: 'UnauthorizedUserError',
                message: 'You cannot update an order that you did not create'
            })
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});
module.exports = ordersRouter;