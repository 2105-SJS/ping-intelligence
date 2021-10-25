// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'cars-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

async function getProductById(productId) {
    try {
        const { rows: [ product ] } = await client.query(`
      SELECT *
      FROM product
      WHERE id=$1;
    `, [productId]);
        
        if (!product) {
            throw {
                name: "ProductNotFoundError",
                message: "Could not find a product with that productId"
            };
        }
        
        return product;
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
// export
module.exports = {
  client,
  getProductById,
  getAllProducts,
  createProduct
  // db methods
}