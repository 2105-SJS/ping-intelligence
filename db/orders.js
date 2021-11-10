const { client } = require('.');

<<<<<<< HEAD

// return the order, include the order's products
const getOrderById = async ( orderId ) => { 
    try {  
        const { rows: [order] } = await client.query(`
            SELECT *
            FROM orders
            WHERE id=$1
        `, [orderId])

        return order;
=======
const getOrdersByProduct = async ({ id }) => { 
    try {
        const { rows: [ orders ] } = await client.query(`
            SELECT *
            FROM orders WHERE id = product.id
        `)
>>>>>>> ff937d9 (created orders db and api)
    } catch (error) { 
        throw error
    }
}

<<<<<<< HEAD

// Should select and return an array of orders, include their products 
const getAllOrders = async () => { 
    try { 
        const { rows: orders } = await client.query(`
            SELECT * 
            FROM orders
        `)

        return orders; 
=======
const getCartByUser = async ({ id }) => { 
    try {
        const { rows: [ id ] } = await client.query(`
            SELECT *
            FROM id WHERE orders = orders."userId" AND status = true
        `)
    
>>>>>>> ff937d9 (created orders db and api)
    } catch (error) { 
        throw error
    }
}

<<<<<<< HEAD
// select and return an array of orders made by user, include their products
const getOrdersByUser = async ({ orderId }) => { 
    try {
        const { rows: orders } = await client.query(`
            SELECT *
            FROM orders
            WHERE "userId" = $1
        `, [orderId])

        return orders
=======
const getOrdersByUser = async ({ id }) => { 
    try {
        const { rows: [ id ] } = await client.query(`
            SELECT *
            FROM id WHERE orders = orders."userId" AND status = true
        `)
    
>>>>>>> ff937d9 (created orders db and api)
    } catch (error) { 
        throw error
    }
}

<<<<<<< HEAD
const getCartByUser = async ({ orderId }) => { 
    try { 
        const { rows: [ cart ] } = await client.query(`
            SELECT * 
            FROM orders 
            WHERE "userID"=$1 AND status='created';
        `, [orderId])

        return cart;
=======
const createOrder = async ({ status, userId }) => { 
    try {
        const { rows: [ status ] } = await client.query(`
            SELECT *
            FROM status AND user."userId" = true
        `)
    
>>>>>>> ff937d9 (created orders db and api)
    } catch (error) { 
        throw error
    }
}
<<<<<<< HEAD

const createOrder = async ({ userId, datePlaced, status }) => { 
    try { 
        const { rows: [ order ]} = await client.query(`
        INSERT INTO orders("userId", "datePlaced", status)
        VALUES($1, $2, $3)
        RETURNING *
        `, [userId, datePlaced, status])
        return order;
    } catch(error) {
        throw error
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
=======
>>>>>>> ff937d9 (created orders db and api)
