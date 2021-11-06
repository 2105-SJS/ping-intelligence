const {client}=require('./client');

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

module.exports = {
    getProductById,
    getAllProducts,
    createProduct
  }