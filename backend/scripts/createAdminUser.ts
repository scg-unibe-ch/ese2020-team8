import { Sequelize } from 'sequelize';
import { User } from '../src/models/user.model';
import bcrypt from 'bcrypt';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false // can be set to true for debugging
});

User.initialize(sequelize);

const ADMIN_USER = {
    email: 'theAdmin@The8-Team.com',
    userName: '8-TeamAdmin',
    password: 'The8-Team',
    firstName: 'Sami',
    lastName: 'AdminTester',
    isAdmin: true
    // gender: null,
    // phone: null,
    // street: null,
    // zip: null,
    // city: null,
    // country: null,
};

sequelize.sync().then( () => {
    const saltRounds = 12;
    ADMIN_USER.password = bcrypt.hashSync(ADMIN_USER.password, saltRounds); // hashes the password, never store passwords as plaintext
    return User.create(ADMIN_USER).then(() => console.log("admin user created"));
})
.catch( err => console.log(err));
