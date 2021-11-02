const { client } = require('.');
const db = require('./cars-dev');

const getOrdersByProduct = async ({ id }) => { 
    try {
        const { rows: [ orders ] } = await client.query(`
            SELECT *
            FROM orders WHERE id = product.id
        `)
       return orders;

    } catch (error) { 
        throw error
    }
    
}

const getCartByUser = async ({ id }) => { 
    try {
        const { rows: [ id ] } = await client.query(`
            SELECT *
            FROM orders WHERE id = orders."userId" AND status = created
        `)
        return id;

    } catch (error) { 
        throw error
    }
}

const getOrdersByUser = async ({ id }) => { 
    try {
        const { rows: orders  } = await client.query(`
            SELECT *
            FROM orders WHERE id = orders."userId" AND status = created
        `)
        return orders;
    
    } catch (error) { 
        throw error
    }
}

const createOrder = async ({ status, userId, orderId }) => { 
    try {
        const { rows: [ status ] } = await client.query(`
            SELECT *
            FROM status AND user."userId" AND user."orderId" = true
        `)
        return status;
        
    } catch (error) { 
        throw error
    }
}