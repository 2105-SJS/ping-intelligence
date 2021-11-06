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
    try
    {
        try
        {
            const { rows: [ edited ] } = await client.query(
            `UPDATE products
            SET "productName"=$1,
            description=$2,
            price=$3,
            "imageURL"=$4,
            "inStock"=$5,
            category=$6
            WHERE "productId"=$7
            RETURNING *;`,
            [
                product.productName,
                product.description,
                product.price,
                product.imageURL,
                product.inStock,
                product.catagory,
                product.productId
            ]);
            return edited;
        }
        catch(error)
        {
            throw error;
        }
    }
    catch(error)
    {
        throw error;
    }
}

const updateUser = async (user) =>
{
    try
    {
        try
        {
            const { rows: [ edited ] } = await client.query(
            `UPDATE products
            SET "firstName"=$1,
            "lastName"=$2,
            email=$3,
            "imageURL"=$4,
            username=$5,
            password=$6,
            "isAdmin"=$7
            WHERE id=$8
            RETURNING *;`,
            [
                user.firstName,
                user.lastName,
                user.email,
                user.imageURL,
                user.username,
                user.password,
                user.isAdmin,
                user.id
            ] );
            delete edited.password;//even on admin hide password
            return edited;
        }
        catch(error)
        {
            throw error;
        }
    }
    catch(error)
    {
        throw error;
    }
}

module.exports=
{
    destoryProduct,
    updateProduct,
    updateUser,
}