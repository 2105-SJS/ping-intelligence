const ordersRouter = require('express').Router();
const { createOrder, getCartByUser, getOrdersByProduct, getOrdersByUser, getAllOrders, getOrderById } = require('../db');
const { requireUser } = require('./utils');