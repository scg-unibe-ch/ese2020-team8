import { Sequelize } from 'sequelize';
import { User } from '../src/models/user.model';
import { Product } from '../src/models/product.model';
import bcrypt from 'bcrypt';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false // can be set to true for debugging
});

User.initialize(sequelize);

const SELLER_USER = {
    email: 'theSeller@The8-Team.com',
    userName: 'Seller',
    password: 'The8-Team',
    firstName: 'Test',
    lastName: 'Seller',
    isAdmin: false
    // gender: null,
    // phone: null,
    // street: null,
    // zip: null,
    // city: null,
    // country: null,
};

const BUYER_USER = {
    email: 'theBuyer@The8-Team.com',
    userName: 'Buyer',
    password: 'The8-Team',
    firstName: 'Test',
    lastName: 'Buyer',
    isAdmin: false
    // gender: null,
    // phone: null,
    // street: null,
    // zip: null,
    // city: null,
    // country: null,
};

sequelize.sync().then( () => {
    const saltRounds = 12;
    SELLER_USER.password = bcrypt.hashSync(SELLER_USER.password, saltRounds); // hashes the password, never store passwords as plaintext
    return User.create(SELLER_USER).then(() => console.log("seller user created"));
})
.catch( err => console.log(err));

sequelize.sync().then( () => {
    const saltRounds = 12;
    BUYER_USER.password = bcrypt.hashSync(BUYER_USER.password, saltRounds); // hashes the password, never store passwords as plaintext
    return User.create(BUYER_USER).then(() => console.log("buyer user created"));
})
.catch( err => console.log(err));


const PRODUCT_BUY_GOOD = {
    UserId: '2',
    title: 'Baby Bed XXL',
    description: 'This Baby-bed suits the big babies and even small children',
    price: '200',
    productType: 'good',
    purchaseType: 'buy',
    availability: 'true',
    location: '3012 Bern',
    delivery: 'true',
    status: 'approved'
};


sequelize.sync().then( () => {
    return Product.create(PRODUCT_BUY_GOOD).then(() => console.log("Baby Bed XXL user created"));
})
.catch( err => console.log(err));
