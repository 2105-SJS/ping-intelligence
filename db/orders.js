const { client } = require('.');
const db = require('./cars-dev');


// return the order, include the order's products
const getOrderById = async ( orderId ) => { 
    try {  
        const { rows } = await client.query(`
            SELECT *
            FROM orders; 
        `)

        return rows;
    } catch (error) { 
        throw error
    }
}


// Should select and return an array of orders, include their products 
const getAllOrders = async ( orders ) => { 
    try { 
        const { rows: [ orders ] } = await client.query(`
            SELECT * 
            FROM order_products;
        `)

        return orders; 
    } catch (error) { 
        throw error
    }
}

// select and return an array of orders made by user, include their products
const getOrdersByUser = async ({ id }) => { 
    try {
        const { rows: [ orders ] } = await client.query(`
            SELECT FROM 
        `)
    } catch (error) { 
        throw error
    }
}

module.exports = { 
    client, 
    getOrderById,
    getAllOrders,
    getOrdersByUser
}