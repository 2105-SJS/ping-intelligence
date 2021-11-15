const {client}=require('./client');

async function getProductById(id) {
    try {
        const { rows: [ product ] } = await client.query(`
        SELECT *
        FROM products
        WHERE "productId"=$1;
        `, [id]);
        
        if (!product) {
            throw {
                name: "ProductNotFoundError",
                message: "Could not find a product with that productId"
            };
        }
        return product;
    } catch (error) {
        throw error;
    };
};

async function getAllProducts() {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM products;
        `);
        return rows;
    } catch (error) {
        throw error;
    };
};

const createProduct = async ({ productName, description, price, imageURL, inStock, category }) => { 

    try { 
        const { rows: [ product ] } = await client.query(`
            INSERT INTO products("productName", description, price, "imageURL", "inStock", category)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [ productName, description, price, imageURL, inStock, category ])

        return product;
    } catch (error) {
        throw error;
    }
}

async function getOrderProductById(id) {
    try {
        const { rows: [ orders ] } = await client.query(`
      SELECT *
      FROM orders
      WHERE id=$1;
    `, [id]);
        
        if (!product) {
            throw {
                name: "ProductNotFoundError",
                message: "Could not find a product with that product id"
            };
        }
        return order_products;
    } catch (error) {
        throw error;
    }
}

async function addProductToOrder({ orderId, productId, price, quantity }) {
    try {
        const { rows: [ orders ] } = await client.query(`
      SELECT *
      FROM orders
      WHERE "orderId"=$1, "productId"=$2, price=$3, quantity=$4;
    `, [orderId, productId, price, quantity]);
        
        if (!productId) {
            createProduct(productId);
            throw {
                name: "ProductNotFoundError",
                message: "Could not find a product with that product id"
            };
        }
        order_products = order_products.quantity;
        order_products = order_products.price;
        return order_products;
    } catch (error) {
        throw error;
    }
}

const updateOrderProduct = async ({ orderId, ...fields }) => {
    try {
        const setString = Object.keys(fields).map(
            (key, index) => `"${key}"=$${index + 1}`
        ).join(', ');

        const { rows: [updateOrderProduct] } = await client.query(`
            UPDATE order_products
            SET ${setString}
            WHERE "orderId"=${orderId}
            WHERE "productId"=${productId}
            WHERE price=${price}
            WHERE quantity=${quantity}
            RETURNING *;
        `, Object.values(fields));
        return updateOrderProduct;
    } catch (error) {
        throw error;
    }
}

const destroyOrderProduct = async (id) => {
    try {
        const { rows: [orders] } = await client.query(`
            DELETE FROM order_products
            WHERE id=$1
            RETURNING *;
        `, [id]);
         await client.query(`
            DELETE FROM order_products
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return order_products;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getProductById,
    getAllProducts,
    createProduct,
    getOrderProductById,
    updateOrderProduct,
    destroyOrderProduct,
    addProductToOrder
}