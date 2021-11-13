// code to build and initialize DB goes here
const { client } = require('./index');

const  { createInitialUsers, createInitialProducts } = require('./seed');

async function buildTables() {
  try {
    console.log('Dropping All Tables...');

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `);

    console.log('Finished dropping tables!');


    // build tables in correct order
    console.log('Starting to create users table...')
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      "firstName" VARCHAR(255) NOT NULL,
      "lastName" VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "imageURL" VARCHAR(255),
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) UNIQUE NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false
    );

  `);

    console.log('Finished creating users table..');

    console.log('Starting to create orders table..');
    await client.query(`
    CREATE TABLE orders(
      "orderId" SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "datePlaced" DATE,
      status VARCHAR(255) DEFAULT 'created'
    );

  `);

    console.log('Finished building orders table..');

    console.log('Starting to create products table..');
    await client.query(`
    CREATE TABLE products(
      "productId" SERIAL PRIMARY KEY,
      "productName" VARCHAR UNIQUE NOT NULL,
      description VARCHAR NOT NULL,
      price VARCHAR NOT NULL,
      "imageURL" VARCHAR DEFAULT 'https://images.unsplash.com/photo-1618486613525-c694bf152b2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      "inStock" BOOLEAN DEFAULT false,
      category VARCHAR(255) NOT NULL
    );

  `);
    console.log('Finished building products table..');

    console.log('Starting to create order_products table..');
    await client.query(`
    CREATE TABLE order_products(
      "order_productId" SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products("productId"),
      "orderId" INTEGER REFERENCES orders("orderId"),
      UNIQUE ("productId", "orderId"),
      price NUMERIC NOT NULL,
      quantity INTEGER DEFAULT 1
    );

  `);
      console.log('Finished building order_products table..');
      console.log('Successfully built all tables');
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    await createInitialUsers();
    await createInitialProducts();
  } catch (error) {
    throw error;
  }
}

client.connect()
  .then(buildTables)
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());