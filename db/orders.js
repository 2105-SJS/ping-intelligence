const { client } = require('.');
const db = require('./cars-dev');

async function getOrderById(orderId) {
    console.log('Db getOrderById with id: ', id);
    try {
        const { rows: [orders] } = await client.query(`
        SELECT * 
        FROM orders
        WHERE "id" = $1 
        `, [orderId])

        return orders;
    } catch (error) {
        throw error;
    }
}
// query to orderproducts
// WHERE orderId = given id


async function getAllOrders() {
    console.log('Db getAllOrders')
    try {
        const { rows } = await client.query(`
        SELECT orderId, userId, datePlace, status
        FROM orders;      
        `)
        return rows
    } catch (error) {
        throw error;
    }
}

async function createOrder({ status, userId }) {
    console.log('Db createOrder')
        
}





module.exports = {
    getOrderById,
    getAllOrders,
}
    