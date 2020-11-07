import { Sequelize } from 'sequelize';
import { Product } from '../src/models/product.model';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false // can be set to true for debugging
});

Product.initialize(sequelize);

const PRODUCT1 = {
    id: 1,
    title: 'Baby Bed XXL',
    description: 'This Baby-bed suits the big babies and even small children',
    price: '200',
    productType: 'good',
    purchaseType: 'buy',
    availability: true,
    location: '3012 Bern',
    delivery: true,
    status: 'approved',
    UserId: 1
};


sequelize.sync().then( () => {
    return Product.create(PRODUCT1).then(() => console.log("Baby Bed XXL created"));
})
.catch( err => console.log(err));
