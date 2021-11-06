const { client } = require('.');
const db = require('./cars-dev');
import { order_products };


// return the order, include the order's products
const getOrderById = async ( orderId ) => { 
    try {  
        const { rows: [order] } = await client.query(`
            SELECT *
            FROM orders
            WHERE id=$1
        `, [orderId])

        return order;
    } catch (error) { 
        throw error
    }
}

// Should select and return an array of orders, include their products 
const getAllOrders = async () => { 
    try { 
        const { rows: orders } = await client.query(`
            SELECT * 
            FROM orders
        `)

        return orders; 
    } catch (error) { 
        throw error
    }
}

// select and return an array of orders made by user, include their products
const getOrdersByUser = async ({ orderId }) => { 
    try {
        const { rows: orders } = await client.query(`
            SELECT *
            FROM orders
            WHERE "userId" = $1
        `, [orderId])

        return orders
    } catch (error) { 
        throw error
    }
}

const getCartByUser = async ({ orderId }) => { 
    try { 
        const { rows: [ cart ] } = await client.query(`
            SELECT * 
            FROM orders 
            WHERE "userID"=$1 AND status='true';
        `, [orderId])

        return cart;
    } catch (error) { 
        throw error
    }
}

const createOrder = async ({ userId, datePlaced, status }) => { 
    try { 
        const { rows: [ order ]} = await client.query(`
        INSERT INTO orders("userId", "datePlaced", status)
        VALUES($1, $2, $3)
        RETURNING *
        `, [userId, datePlaced, status])
    } catch(error) {
        throw error
    }
}

async function getOrderProductById(id) {
    try {
        const { rows: [ orders ] } = await client.query(`
      SELECT *
      FROM orders
      WHERE id=$1;
    `, [id]);
        
        if (!product) {
            throw {
                name: "ProductNotFoundError",
                message: "Could not find a product with that product id"
            };
        }
        return order_products;
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    client, 
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    getCartByUser,
    createOrder
}