const { client } = require('.');

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
