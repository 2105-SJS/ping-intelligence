const { client } = require('.');
// const db = require('./cars-dev');
// const { NewProduct } = require('./api/products');
const  { createProduct } = require('./Products');
const  { createUser } = require('./users');

async function createInitialProducts() {
    try {
        console.log("Starting to create products...");

        await createProduct({
            name: 'Aston Martin DBS Superleggera 2020',
            description: 'Twin-turbocharged 5.2 V12 powered Two-seater',
            price: '$300,000 USD',
            imageURL: 'https://images.unsplash.com/photo-1618486613525-c694bf152b2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            inStock: "yes",
            category: "new"
        });
        await createProduct({
            name: 'Bentley Continental GT V8 2020',
            description: 'A 542 hp V8 powered Two-seater',
            price: '$200,000 USD',
            imageURL: 'https://images.unsplash.com/photo-1471289549423-04adaecfa1f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1405&q=80',
            inStock: "yes",
            category: "new"
        });
       await createProduct({
            name: 'Lamborghini Aventador SVJ Roadster 2020',
            description: 'A 6.5-liter, 770 hp, naturally aspirated V12 Two-seater',
            price: '$600,000 USD',
            imageURL: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            inStock: "yes",
            category: "new"
        });

        console.log("Finished creating products!");
    } catch (error) {
        console.error("Error creating products!");
        throw error;
    }
}

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
    module.exports = {
    createInitialUsers,
    createInitialProducts
  } 