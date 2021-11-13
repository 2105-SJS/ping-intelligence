const { client } = require('./client');

const getOrdersByProduct = async ({ id }) => { 
    try {
        const { rows: [ orders ] } = await client.query(`
            SELECT *
            FROM orders WHERE id = product.id
        `)
    } catch (error) { 
        throw error
    }
}

const getCartByUser = async ({ id }) => { 
    try {
        const { rows: [ order ] } = await client.query(`
            SELECT *
            FROM orders WHERE orders."userId"=$1 AND status = 'created'
        `,
        [ id ] );
        const { rows: products } = await client.query(
        `SELECT *
        FROM order_products
        JOIN products ON order_products."productId"=products."productId"
        WHERE order_products."orderId"=$1`,
        [ order.orderId ] );
        order.products = products;
        return order;
    } catch (error) { 
        throw error
    }
}

const getOrdersByUser = async ({ id }) => { 
    try {
        const { rows: orders } = await client.query(`
            SELECT *
            FROM order WHERE orders."userId"=$1 AND status = 'created'
        `, [ id ] );
        return orders;
    } catch (error) { 
        throw error
    }
}

const getOrderById = async ({ status, userId }) => { 
    try {
        const { rows: [ status ] } = await client.query(`
            SELECT *
            FROM order AND user."userId" = true
        `)
        return status;
    } catch (error) { 
        throw error
    }
}

const createOrder = async ({ userId, status }) => { 
    try { 
        const { rows: [ order ]} = await client.query(`
        INSERT INTO orders("userId", "datePlaced", status)
        VALUES($1, current_date, $2)
        RETURNING *;
        `, [userId, status])
        return order;
    } catch(error) {
        throw error
    }
}

module.exports = { 
    getOrderById,
    //getAllOrders,
    getOrdersByUser,
    getCartByUser,
    createOrder
}
