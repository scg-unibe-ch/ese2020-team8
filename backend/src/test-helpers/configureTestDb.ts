import { Sequelize } from 'sequelize';

export const testSequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'test-db.sqlite',
    logging: false // can be set to true for debugging
});
