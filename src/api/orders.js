
ordersRouter.use((req, res, next) => {
    console.log("A request is being made to /orders");

    next();
});

ordersRouter.get('/orders', async (req, res, next) => {
    try {
        const allOrder = await getAllOrders();

        res.send({
            allOrders
        });
    } catch ({ name, message }) {
        console.log("ordersRouter.get message: ", message)
        next({ name, message });
    }
});

ordersRouter.get('/orders/cart', async (req, res, next) => {
    try {
        const allOrders = await getAllOrders();

        res.send({
            allOrders
        });
    } catch ({ name, message }) {
        console.log("ordersRouter.get message: ", message)
        next({ name, message });
    }
});

ordersRouter.post('/orders', async (req, res, next) => {
    const { orderId, userId, datePlaced, status, order_product } = req.body;
    const data = { orderId, userId, datePlaced, status, order_product }
    try {
        const activity = await createOrder(data);
        res.send(activity)
    } catch (error) {
        next(error);
    }
});

ordersRouter.get('/users/:userId/orders', async (req, res, next) => {
    try {
        const allOrders = await getAllOrders();

        res.send({
            allOrders
        });
    } catch ({ name, message }) {
        console.log("ordersRouter.get message: ", message)
        next({ name, message });
    }
});