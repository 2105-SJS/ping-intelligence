const { client } = require('./client');

const updateOrder = async ( { id, status, userId } ) =>
{
    const fields = 
    {
        status: status,
        userId: userId
    };
    const setString = Object.keys( fields ).map( ( key, idx ) =>
    {
        return `"${ key }"=$${ idx + 1 }`
    })
    .join(',');
    if(setString === "")
    {
        return;
    }
    try 
    {
        const { rows: [ order ] } = await client.query(
        `UPDATE orders 
        SET ${ setString }
        WHERE "orderId"=${ id }
        RETURNING *;`,
        Object.values( fields ) );
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
    updateOrder,
    completeOrder,
    cancelOrder,
}