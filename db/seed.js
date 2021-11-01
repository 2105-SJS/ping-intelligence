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

// async function rebuildDB() {
//     try {
//         client.connect();

//         await createInitialUsers();
//         await createInitialOrders();
//     } catch (error) {
//         console.log("Error during rebuildDB")
//         throw error;
//     }
// }

async function testDB() {
    try {
        console.log("Starting to test database...");

        console.log("Calling createInitialUsers");
        const users = await createInitialUsers();
        console.log("Result:", users);

        console.log("Calling createInitialOrders");
        const orders = await createInitialOrders();
        console.log("Result:", orders);

        console.log("Finished orders tests!");
    } catch (error) {
        console.log("Error during testDB");
        throw error;
    }
}

// rebuildDB()
//     .then(testDB)
//     .catch(console.error);

    module.exports = {
    createInitialUsers,
    createInitialOrders
  }