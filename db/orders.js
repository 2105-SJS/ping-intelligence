const { client } = require('.');
const db = require('./cars-dev');

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
        const { rows: [ id ] } = await client.query(`
            SELECT *
            FROM id WHERE orders = orders."userId" AND status = true
        `)
    
    } catch (error) { 
        throw error
    }
}

const getOrdersByUser = async ({ id }) => { 
    try {
        const { rows: [ id ] } = await client.query(`
            SELECT *
            FROM id WHERE orders = orders."userId" AND status = true
        `)
    
    } catch (error) { 
        throw error
    }
}

const createOrder = async ({ status, userId }) => { 
    try {
        const { rows: [ status ] } = await client.query(`
            SELECT *
            FROM status AND user."userId" = true
        `)
    
    } catch (error) { 
        throw error
    }
}
