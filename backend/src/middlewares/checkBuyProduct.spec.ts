import { expect } from 'chai';
import { Product } from '../models/product.model';
import { testSequelize } from '../test-helpers/configureTestDb';
import { findProductThatShouldNotExist } from './checkBuyProduct';

const DEFAULT_PRODUCT = {
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


fdescribe('buy product middleware', () => {
    it('prevents that you can buy your own product', async () => {
    });

    it('tests query own product', async () => {
        Product.initialize(testSequelize);
        await testSequelize.sync();
        const userId = 3;
        const product = await Product.create({
            ...DEFAULT_PRODUCT,
            UserId: userId
        });
        const unbuyableProduct = await findProductThatShouldNotExist(product.id, userId);
        return expect(unbuyableProduct).to.not.exist;
    });
    it('tests query status not approved product', async () => {
        Product.initialize(testSequelize);
        await testSequelize.sync();
        const product = await Product.create({
            ...DEFAULT_PRODUCT,
            status: 'pending',
        });
        const unbuyableProduct = await findProductThatShouldNotExist(product.id, product.UserId + 1);
        return expect(unbuyableProduct).to.not.exist;
    });
});
