const  { createProduct } = require('./Products');
const  { createUser } = require('./users');

async function createInitialProducts() {
    try {
        console.log("Starting to create products...");

        await createProduct({
            productName: 'Aston Martin DBS Superleggera 2020',
            description: 'Twin-turbocharged 5.2 V12 powered Two-seater',
            price: '$300,000 USD',
            imageURL: 'https://images.unsplash.com/photo-1618486613525-c694bf152b2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            inStock: "yes",
            category: "new"
        });
        await createProduct({
            productName: 'Bentley Continental GT V8 2020',
            description: 'A 542 hp V8 powered Two-seater',
            price: '$200,000 USD',
            imageURL: 'https://images.unsplash.com/photo-1471289549423-04adaecfa1f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1405&q=80',
            inStock: "yes",
            category: "new"
        });
       await createProduct({
            productName: 'Lamborghini Aventador SVJ Roadster 2020',
            description: 'A 6.5-liter, 770 hp, naturally aspirated V12 Two-seater',
            price: '$600,000 USD',
            imageURL: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            inStock: "yes",
            category: "new"
        });
        await createProduct({
            productName: 'BMW M3 1999',
            description: 'A 3.2-liter, 240 hp, naturally aspirated inline 6 cylinder Two-door, 4 seater',
            price: '$50,000 USD',
            imageURL: 'https://i.pinimg.com/564x/04/47/02/0447026bc590d2b5786ebe2a4a9c00ce.jpg',
            inStock: "yes",
            category: "used"
        });
        await createProduct({
            productName: 'Lamborghini Countach 1995',
            description: 'A 6.5-liter, 440 hp, naturally aspirated V12 cylinder Two-seater',
            price: '$300,000 USD',
            imageURL: 'https://2p2bboli8d61fqhjiqzb8p1a-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/Lamborghini-Countach-Turbo-LP400-S-Low-Body-6-of-14.jpg',
            inStock: "yes",
            category: "used"
        });
        await createProduct({
            productName: 'Porsche 911 Turbo S Coupe 2021',
            description: 'A 3.5-liter, 640 hp, naturally aspirated flat 6 cylinder Two-seater',
            price: '$204,850 USD',
            imageURL: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-porsche-911-turbo-s-pdk-130-edit-1608061336.jpg?crop=0.622xw:0.466xh;0.376xw,0.500xh&resize=980:*',
            inStock: "yes",
            category: "new"
        });
        await createProduct({
            productName: 'Bugatti La Voiture Noire 2020',
            description: 'A 6.0-liter, 570 hp, naturally aspirated V8 Two-seater',
            price: '$18.7 million USD',
            imageURL: 'https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2020/03/1.-Bugatti-La-Voiture-Noire-18.7-million.jpg?q=50&fit=crop&w=750&dpr=1.5',
            inStock: "yes",
            category: "new"
        });
        await createProduct({
            productName: 'Ferrari 488 Pista Spider 2020',
            description: 'A 5.5-liter, 500 hp, naturally aspirated V8 Two-seater',
            price: '$605,000 USD',
            imageURL: 'https://www.jamesedition.com/stories/wp-content/uploads/2020/10/1_pista.jpg',
            inStock: "yes",
            category: "new"
        });
        await createProduct({
            productName: 'McLaren 720S Spider MSO 2020',
            description: 'A 6.5-liter, 770 hp, naturally aspirated V12 Two-seater',
            price: '$364,090 USD',
            imageURL: 'https://www.jamesedition.com/stories/wp-content/uploads/2020/10/4_mclaren.jpg',
            inStock: "yes",
            category: "new"
        });
        await createProduct({
            productName: 'Porsche 911 GT2 RS 2011',
            description: 'A 3.5-liter, 640 hp, naturally aspirated flat 6 cylinder Two-seater',
            price: '$600,000 USD',
            imageURL: 'https://www.jamesedition.com/stories/wp-content/uploads/2020/10/8_porsche_gt2.jpg',
            inStock: "yes",
            category: "used"
        });
        await createProduct({
            productName: 'Lotus Emira 2022',
            description: 'A 3.5-liter, 260 hp, naturally aspirated V6 Two-seater',
            price: '$350,000 USD',
            imageURL: 'https://i2.wp.com/hitvibz.com/wp-content/uploads/2021/07/lotus3.jpg?resize=572%2C290&ssl=1',
            inStock: "no",
            category: "new"
        });
        await createProduct({
            productName: 'McLaren F1 1992',
            description: 'A 6.0-liter, 6270 hp, naturally aspirated V12 Two-seater',
            price: '$20 million USD',
            imageURL: 'https://robbreport.com/wp-content/uploads/2019/12/6092563g.jpg?w=1000',
            inStock: "yes",
            category: "used"
        });
        await createProduct({
            productName: 'Saleen S7 2000',
            description: 'A 3.5-liter, 550 hp, naturally aspirated V8 Two-seater',
            price: '$2.5 million USD',
            imageURL: 'https://robbreport.com/wp-content/uploads/2019/12/45211525.jpg?w=1000',
            inStock: "yes",
            category: "used"
        });
        await createProduct({
            productName: 'Mercedes-Benz SLS AMG Black Series 2014',
            description: 'A 6.5-liter, 430 hp, naturally aspirated V8 Two-seater',
            price: '$420,000 USD',
            imageURL: 'https://www.jamesedition.com/stories/wp-content/uploads/2020/10/3_merc.jpg',
            inStock: "yes",
            category: "used"
        });
        await createProduct({
            productName: 'Porsche 911 GT3 Carrera 2022',
            description: 'A 3.5-liter, 502 hp, naturally aspirated flat 6 cylinder Two-seater',
            price: '$162,450 USD',
            imageURL: 'https://cimg1.ibsrv.net/ibimg/hgm/1920x1080-1/100/787/porsche-911-carrera_100787037.jpg',
            inStock: "yes",
            category: "new"
        });
        await createProduct({
            productName: 'BMW M3 2021',
            description: 'A 3.0-liter, 473 hp, naturally aspirated I6 Twin-Turbo Two-seater',
            price: '$85,000 USD',
            imageURL: 'https://automanager.blob.core.windows.net/wmphotos/025035/aab83a102dd34f27b7460a92d48c18ff/c0414ccfe9_800.jpg',
            inStock: "yes",
            category: "used"
        });
        await createProduct({
            productName: 'Ferrari 812 Superfast 2022',
            description: 'A 6.5-liter, 800 hp, naturally aspirated V12 Two-seater',
            price: '$600,000 USD',
            imageURL: 'https://di-uploads-pod34.dealerinspire.com/wideworldferrari/uploads/2021/06/Ferrari-of-Naples-Sliders-1800x960.png',
            inStock: "yes",
            category: "new"
        });
        await createProduct({
            productName: 'Lamborghini Huracan LP610-4 2015',
            description: 'A 5.2-liter, 450 hp, naturally aspirated V10 Two-seater',
            price: '$245,000 USD',
            imageURL: 'https://www.cars.com/vehicledetail/19a3ea66-cdc0-4289-bbd7-6a8f6c7273f7/',
            inStock: "yes",
            category: "used"
        });
        await createProduct({
            productName: 'Porsche 911 GT3 RS 2016',
            description: 'A 4.0-liter, 302 hp, naturally aspirated flat 6 cylinder Two-seater',
            price: '$600,000 USD',
            imageURL: 'https://www.cars.com/vehicledetail/f7647a07-3e0d-483f-819d-aa6e12f32834/',
            inStock: "yes",
            category: "used"
        });
        await createProduct({
            productName: 'Bugatti Veyron 2010',
            description: 'A 6.5-liter, 1000 hp, naturally aspirated W16 Two-seater',
            price: '$2.5 million USD',
<<<<<<< HEAD
            imageURL: 'https://www.exoticcarlist.com/blog/wp-content/uploads/2020/10/IMG_14467-large.jpg',
=======
            imageURL: 'https://www.exoticcarlist.com/blog/wp-content/uploads/2020/10/IMG_14467-large.jpg,
>>>>>>> 9d5a0b5 (added addition vehicles)
            inStock: "yes",
            category: "used"
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
};