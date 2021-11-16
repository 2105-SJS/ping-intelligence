const { client } = require('./client');

const priceToNumber = (s) =>
{
    const lower = String( s ).toLowerCase();
    let mult = 1;
    if( lower.includes( 'billion' ) )
    {
        mult = 1000000000;
    }
    else if ( lower.includes( 'million' ) )
    {
        mult = 1000000;
    }
    else if ( lower.includes( 'thousand' ) )
    {
        mult = 1000;
    }
    return mult * Number( String( s ).replace( /[^01234567689.]+/g, '' ).match( /[0-9]*.?[0-9]*/ ) [ 0 ] );
}

async function getOrderProductsById(id) {
    console.log('Db getOrderProductsById with id: ', id);
    try {
        const { rows: [order_Products] } = await client.query(`
        SELECT * 
        FROM order_products
        WHERE "order_productId" = $1 
        `, [id])

        return order_Products;
    } catch (error) {
        throw error;
    }
}

async function getOrderProductsByProductIdAndOrderId( { productId, orderId } ) 
{
    try {
        const { rows: [order_Products] } = await client.query(`
        SELECT * 
        FROM order_products
        WHERE "productId" = $1 
        AND "orderId" = $2;
        `, [ productId, orderId ] );

        return order_Products;
    } catch (error) {
        throw error;
    }
}

async function addProductToOrder({ orderId, productId, price, quantity }) {
    console.log('Db addProductToOrder');
    try {
        const value = priceToNumber( price );

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
            `, [productId, orderId, value, quantity])
            return createOrder_Product; 
        }
        else {
        const { rows: addedProducts} = await client.query(`
            UPDATE order_products
            SET "quantity" = $3 , "price" = $4 
            WHERE "orderId" = $1 AND "productId" = $2
            RETURNING * ;
            `, [orderId, productId, order.quantity + quantity , value])
            return addedProducts }

    } catch (error) {
        throw error;
    }
}

async function updateOrderProduct({ id, price, quantity }) {
    console.log('Db updateOderProduct');
    try {
        const value = priceToNumber( price );
        const {rows: [order]} = await client.query(`
        UPDATE order_products
        SET price = $1, quantity = $2
        WHERE "order_productId" = $3
        RETURNING *;
        `, [value, quantity, id]);
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
        WHERE "order_productId" = $1
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
    updateOrderProduct,
    getOrderProductsByProductIdAndOrderId
}
    