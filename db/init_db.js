// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();
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
      status BOOLEAN DEFAULT true
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
      "imageURL" VARCHAR,
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
    async function createInitialUsers() {
    try {
        console.log("Starting to create users...");

        await createUser({
            firstName: 'Albert',
            lastName: 'Tyler',
            email: 'onPatrol24-7@email.com',
            username: 'COPS-89',
            password: 'junie-05'
        });
        await createUser({
            firstName: 'Agatha',
            lastName: 'Hemlock',
            email: 'witchOnABroom@email.com',
            username: 'badWitch4lyfe',
            password: 'h3x3s0nU'
        });
        await createUser({
            firstName: 'Rod',
            lastName: 'Serling',
            email: 'MyN1ghtMaresMake$@email.com',
            username: 'darkDoctor',
            password: 'Sp3llB0und'
        });

        console.log("Finished creating users!");
    } catch (error) {
        console.error("Error creating users!");
        throw error;
    }
}

async function createInitialOrders() {
    try {
        console.log("Starting to create orders...");

        await createOrder({
            orderId: '12345678',
            userId: { userId },
            datePlaced: { datePlaced },
            status: { status },
            order_product: { order_product }
        });
        await createOrder({
            orderId: '91011121',
            userId: { userId },
            datePlaced: { datePlaced },
            status: { status },
            order_product: { order_product }
        });
       await createOrder({
            orderId: '31415161',
            userId: { userId },
            datePlaced: { datePlaced },
            status: { status },
            order_product: { order_product }
        });

        console.log("Finished creating orders!");
    } catch (error) {
        console.error("Error creating orders!");
        throw error;
    }
}

async function createInitialProducts() {
    try {
        console.log("Starting to create products...");

        await createProduct({
            id: 123,
            name: 'Aston Martin DBS Superleggera 2020',
            description: 'Twin-turbocharged 5.2 V12 powered Two-seater',
            price: '$300,000 USD',
            imageURL: 'https://tinyurl.com/AstinMartinURL',
            inStock: true,
            category: 'new'
        });
        await createProduct({
            id: 456,
            name: 'Bentley Continental GT V8 2020',
            description: 'A 542 hp V8 powered Two-seater',
            price: '$200,000 USD',
            imageURL: 'https://tinyurl.com/BentleyContinentalGT',
            inStock: true,
            category: 'new'
        });
       await createProduct({
            id: 789,
            name: 'Lamborghini Aventador SVJ Roadster 2020',
            description: 'A 6.5-liter, 770 hp, naturally aspirated V12 Two-seater',
            price: '$600,000 USD',
            imageURL: 'https://tinyurl.com/LamborghiniRoadster',
            inStock: true,
            category: 'used'
        });

        console.log("Finished creating products!");
    } catch (error) {
        console.error("Error creating products!");
        throw error;
    }
}

async function testDB() {
    try {
        console.log("Starting to test database...");

        console.log("Calling createInitialUsers");
        const users = await createInitialUsers();

        console.log("Calling createInitialOrders");
        const orders = await createInitialOrders();
    
        console.log("Calling createInitialProducts");
        const products = await createInitialProducts();
      
        console.log("Finished orders and products tests!");
    } catch (error) {
        console.log("Error during testDB");
        throw error;
    }
}
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());