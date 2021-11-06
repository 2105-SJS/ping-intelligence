const { client } = require('./client');

const getOrderById = async ( { id } ) =>
{
    const { rows: [ order ] } = await client.query(
    `SELECT *
    FROM orders
    WHERE "orderId"=$1`,
    [ id ] );
    return order;
}

const updateOrder = async ( { id, status, userId } ) =>
{
    const fields = { status, userId };
    const setString = Object.keys( fields ).map( ( key, idx ) =>
    {
        return `"${ key }"=$${ idx + 1 }`
    })
    .join(',');
    try 
    {
        const { rows: [ order ] } = await client.query(
        `UPDATE orders 
        SET ${ setString }
        WHERE "orderId"=${ id }
        RETURNING *;`,
        Object.values( fields ));
        return order;
    }
    catch ( error ) 
    {
        throw error;
    }
}

const completeOrder = async ( { id } ) =>
{
    try 
    {
        const { rows: [ order ] } = await client.query(
        `UPDATE orders 
        SET status='completed'
        WHERE "orderId"=$1
        RETURNING *;`,
        [ id ] );
        return order;
    }
    catch ( error ) 
    {
        throw error;
    }
}

const cancelOrder = async ( id ) =>
{
    try 
    {
        const { rows: [ order ] } = await client.query(
        `UPDATE orders 
        SET status='cancelled'
        WHERE "orderId"=$1
        RETURNING *;`,
        [ id ] );
        return order;
    }
    catch ( error ) 
    {
        throw error;
    }
}

module.exports =
{
    getOrderById,
    updateOrder,
    completeOrder,
    cancelOrder,
}