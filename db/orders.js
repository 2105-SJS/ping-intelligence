const { client } = require('./index');
const db = require('./cars-dev');

const getOrdersByProduct = async ({ id }) => { 
    try {
    async function order_products() {
    try {
        console.log("Starting to create order of selected products...");

        await createOrder({
            orderId: { orderId },
            productId: { productId },
            price: { price },
            quantity: { quantity }
        });
        return order_products;
    } catch (error) { 
        throw error
    }
}

const updateOrderProduct = async ({ id, price, quantity }) => { 
    try {
    async function order_products() {
    if ( { id } = orderId ) {
        price = { price };
        quantity = { quantity }:
    }
        return order_products;

    } catch (error) { 
        throw error
    }
}

const destroyOrderProduct=async(id)=>
{
    try
    {
        const {rows:[orders]}=await client.query(
        `SELECT *
        FROM order
        WHERE "productId"=$1;`,
        [id]    
        );
        delete user.order.order_productId;
        return order;
    }
    catch(error)
    {
        throw error;
    }
}

const getOrderProductById = async ({ orderId }) => { 
    try {
        const { rows: [ orders ] } = await client.query(`
            SELECT *
            FROM orders WHERE USER = user.id AND order_products = user.order.productId
        `)
       return order_products;

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
