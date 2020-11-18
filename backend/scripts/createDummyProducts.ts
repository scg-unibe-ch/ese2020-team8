import { Sequelize } from 'sequelize';
import { Product } from '../src/models/product.model';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false // can be set to true for debugging
});

Product.initialize(sequelize);

const PRODUCT1 = {
    title: 'Baby Bed XXL',
    description: 'This Baby-bed suits the big babies and even small children',
    price: 200,
    productType: 'good',
    purchaseType: 'buy',
    availability: true,
    location: '3012 Bern',
    delivery: true,
    status: 'approved',
    UserId: 3,
    rentalDays: 365
};


const PRODUCT2 = {
    title: 'Baby Bed Mini for Rental',
    description: 'This Baby-bed suits the small children',
    price: 2,
    productType: 'good',
    purchaseType: 'rent',
    availability: true,
    location: '3012 Bern',
    delivery: false,
    status: 'approved',
    UserId: 3,
    rentalDays: 365
};

const PRODUCT3 = {
    title: '1H Babysitting',
    description: 'I am the perfect Nanny for children at age 2 to 6',
    price: 15,
    productType: 'service',
    purchaseType: 'buy',
    availability: true,
    location: '3012 Bern',
    delivery: false,
    status: 'approved',
    UserId: 3,
    rentalDays: 365
};

sequelize.sync().then( async () => {
    await Product.create(PRODUCT1);
    console.log('Baby Bed XXL created');
    await Product.create(PRODUCT2);
    console.log('Product 2 created');
    await Product.create(PRODUCT3);
    console.log('Product 3 created');

})
.catch( err => console.log(err));
