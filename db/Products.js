const {client}=require('./client');

async function getProductById(productId) {
    try {
        const { rows: [ product ] } = await client.query(`
      SELECT *
      FROM product
      WHERE id=$1;
    `, [productId]);
        
        if (!productId) {
            throw {
                name: "ProductNotFoundError",
                message: "Could not find a product with that productId"
            };
        }
        return productId;
    } catch (error) {
        throw error;
    }
}

async function getAllProducts() {
    try {
        const { rows } = await client.query(`
      SELECT *
      FROM products;
    `);
        return rows;
    } catch (error) {
        throw error;
    }
}

const createProduct = async ({ id, name, description, price, imageURL, inStock, category}) => { 

    try { 
        const { rows: [ product ] } = await client.query(`
            INSERT INTO products(id, name, description, price, "imageURL", "inStock", category)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [id, name, description, price, imageURL, inStock, category])

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

const updateOrderProduct = async ({ id, price, quantity }) => {
    try {
        const {rows: updatedOrderProduct } = await client.query(`
            UPDATE order_products
            SET price = $1, quantity = $2
            WHERE id = $3
            RETURNING *;
        `, [price, quantity, id]);
        return updatedOrderProduct;
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
    destroyOrderProduct
  }