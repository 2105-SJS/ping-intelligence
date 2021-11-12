const { client } = require('.');

const getProductsFromOrderId = async (orderId) => {
    try { 
        const { rows: products } = await client.query(`
            SELECT * 
            FROM products 
            JOIN order_products on products."productId"=order_products."productId"
            WHERE order_products."orderId"=$1;
        `, [orderId])

        return products
    } catch (error) {
        throw error
    }
}

const getOrdersByProduct = async ({ id }) => {
    try {
        const { rows: orders } = await client.query(`
            SELECT * 
            FROM orders 
            JOIN order_products ON orders."orderId"=order_products."orderId"
            WHERE order_products."productId"=$1;
        `, [id]);
        orders.forEach(async (order) => {
            const { rows: product } = await client.query(`
            SELECT *
            FROM products
            JOIN order_products ON products."productId"=order_products."productId"
            WHERE order_products."orderId"=$1
            `, [order.id])
            order.products = product
        })
        return orders;
    } catch (error) {
        throw error
    }
}

const getOrderById = async (id) => {
    try {
        if (!id) throw Error('There is no order id')
        const { rows: [order] } = await client.query(`
            SELECT * 
            FROM orders 
            WHERE "orderId"=$1
        `, [id])

        const { rows: products } = await client.query(`
            SELECT * 
            FROM products 
            JOIN order_products ON products."productId"=order_products."productId"
            WHERE order_products."orderId"=$1;
        `, [id])
        order.products = products
        return order;
    } catch (error) {
        throw error
    }
}

const getCartByUser = async ({ id }) => {
    try {
        const { rows: [cart] } = await client.query(`
        SELECT *
        FROM orders
        WHERE "userId" = $1 and status='created'
     `, [id])

        const { rows: products } = await client.query(`
        SELECT * 
        FROM products 
        JOIN order_products ON products."productId"=order_products."productId"
        WHERE order_products."orderId"=$1;
    `, [cart.orderId])
        cart.products = products;
        return cart
    } catch (error) {
        throw error
    }
}

const getOrdersByUser = async ({ id }) => {
    try {
        const { rows } = await client.query(`
        SELECT *, users as "creatorId"
        FROM orders
        JOIN users on orders."creatorId"=users."usersId"
        WHERE "userId" = $1
    `, [id]);
       for (let order of rows) {
           order.products = await getProductsFromOrderId(order.id);
       }

        return rows;
    } catch (error) {
        throw error
    }
}


// May need to look over 
const getAllOrders = async () => {
    try {
        const { rows: orders } = await client.query(`
            SELECT *
            FROM orders
        `)
        orders.forEach(async (order) => {
            const { rows: products } = await client.query(`
                SELECT * from products 
                JOIN order_products ON products."productId"=orders_products."productId" 
                WHERE order_products."orderId"=$1
            `, [order.orderId])
            order.products = products
        })
    } catch (error) {
        throw error
    }

}


const createOrder = async ({ userId, datePlaced, status }) => {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders("userId", "datePlaced", status)
            VALUES($1, $2, $3)
            RETURNING *
        `, [userId, datePlaced, status])
        return order;
    } catch (error) {
        throw error
    }
}


module.exports = {
    client,
    getOrdersByProduct,
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    getCartByUser,
    createOrder,
    getProductsFromOrderId
}
