const { client } = require('./client');

const destoryProduct = async ( { id } ) =>
{
    try 
    {
        const { rows: order_products } = await client.query(
        `DELETE FROM order_products
        JOIN order."orderId"=order_products."orderId"
        WHERE "productId"=$1
        AND status!='completed';`
        );

        const { rows: [ product ] } = await client.query(
        `DELETE FROM products
        WHERE "productId"=$1;`,
        [ id ] );

        product.order_products = order_products;
        return product;
    }
    catch ( error ) 
    {
        throw error;
    }
}

const updateProduct = async ( product ) =>
{
    const id = product.productId;
    delete product.productId;
    const setString = Object.keys( product ).map( ( key, idx ) =>
    {
        return `"${ key }"=$${ idx + 1 }`
    })
    .join(',');

    if ( setString === '' )
    {
        return;
    }
    try
    {
        const { rows: [ edited ] } = await client.query(
        `UPDATE products
        SET ${ setString }
        WHERE "productId"=${ id }
        RETURNING *;`,
        Object.values( product ) );
        return edited;
    }
    catch(error)
    {
        throw error;
    }
}

const updateUser = async (user) =>
{
    const id = user.id;
    delete user.id;
    const setString = Object.keys( user ).map( ( key, idx ) =>
    {
        return `"${ key }"=$${ idx + 1 }`
    })
    .join(',');

    if ( setString === '' )
    {
        return;
    }
    try
    {
        const { rows: [ edited ] } = await client.query(
        `UPDATE users
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;`,
        Object.values( user ) );
        delete edited.password;//even on admin hide password
        return edited;
    }
    catch(error)
    {
        throw error;
    }
}

module.exports =
{
    destoryProduct,
    updateProduct,
    updateUser,
}