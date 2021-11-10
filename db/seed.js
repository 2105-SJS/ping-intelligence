async function createInitialProducts() {
    try {
        console.log("Starting to create products...");

        await createProduct({
            id: 123,
            name: 'Aston Martin DBS Superleggera 2020',
            description: 'Twin-turbocharged 5.2 V12 powered Two-seater',
            price: '$300,000 USD',
            imageURL: 'https://tinyurl.com/AstinMartinURL',
            inStock: yes,
            category: new
        });
        await createProduct({
            id: 456,
            name: 'Bentley Continental GT V8 2020',
            description: 'A 542 hp V8 powered Two-seater',
            price: '$200,000 USD',
            imageURL: 'https://tinyurl.com/BentleyContinentalGT',
            inStock: yes,
            category: new
        });
       await createProduct({
            id: 789,
            name: 'Lamborghini Aventador SVJ Roadster 2020',
            description: 'A 6.5-liter, 770 hp, naturally aspirated V12 Two-seater',
            price: '$600,000 USD',
            imageURL: 'https://tinyurl.com/LamborghiniRoadster',
            inStock: yes,
            category: new
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