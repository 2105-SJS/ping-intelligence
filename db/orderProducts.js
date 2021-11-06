const { client } = require('.');
const db = require('./cars-dev');

async function getOrderProductsById(id) {
    console.log('Db getOrderProductsById with id: ', id);
    try {
        const { rows: [order_Products] } = await client.query(`
        SELECT * 
        FROM order_products
        WHERE "id" = $1 
        `, [id])

        return order_Products;
    } catch (error) {
        throw error;
    }
}

async function addProductToOrder({ orderId, productId, price, quantity }) {
    console.log('Db addProductToOrder');
    try {
        const {rows: [ order ]} = await client.query
        (`
        SELECT *
        FROM order_products
        WHERE "orderId" = $1 AND "productId" = $2
        `, [orderId, productId]);

        if(!order) {
            const { rows: createOrder_Product } = await client.query(`
            INSERT INTO order_products ("productId", "orderId", price, quantity )
            VALUES($1, $2, $3, $4)
            ON CONFLICT DO NOTHING
            RETURNING *
            `, [productId, orderId, price, quantity])
            return createOrder_Product; 
        }
        else {
        const { rows: addedProducts} = await client.query(`
            UPDATE order_products
            SET "quantity" = $3 , "price" = $4 
            WHERE "orderId" = $1 AND "productId" = $2
            RETURNING * ;
            `, [orderId, productId, order.quantity + quantity , price])
            return addedProducts }

    } catch (error) {
        throw error;
    }
}

async function updateOrderProduct({ id, price, quantity }) {
    console.log('Db updateOderProduct');
    try {
        const {rows: [order]} = await client.query(`
        UPDATE order_products
        SET price = $1, quantity = $2
        WHERE id = $3
        RETURNING *;
        `, [price, quantity, id]);
        return order; 
    } catch (error) {
        throw error;
    }
}

async function destroyOrderProduct(id) {
    console.log('Db destroyOrderProduct');
    try {
        const { rows: [product] } = await client.query(`
        DELETE from order_products
        WHERE "id" = $1
        RETURNING *;
        `, [id])
        return product 
    } catch (error) {
        throw error
    }
}

module.exports = {
    getOrderProductsById,
    addProductToOrder,
    destroyOrderProduct,
    updateOrderProduct
}
    