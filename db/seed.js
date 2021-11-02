// const {
//     client
// } = require('./index');

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
        console.log("Result:", users);

        console.log("Calling createInitialOrders");
        const orders = await createInitialOrders();
        console.log("Result:", orders);

        console.log("Calling createInitialProducts");
        const products = await createInitialProducts();
        console.log("Result:", products);

        console.log("Finished orders and products tests!");
    } catch (error) {
        console.log("Error during testDB");
        throw error;
    }
}


    module.exports = {
    createInitialUsers,
    createInitialOrders,
    createInitialProducts
  }