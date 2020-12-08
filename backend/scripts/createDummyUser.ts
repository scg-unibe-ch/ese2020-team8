import { Sequelize } from 'sequelize';
import { User } from '../src/models/user.model';
import bcrypt from 'bcrypt';
import {config} from '../src/config';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.dbFile,
    logging: false // can be set to true for debugging
});

User.initialize(sequelize);

const DUMMY_USER = {
    email: 'dummy1@test.com',
    userName: 'seller',
    password: 'dummyTest_1',
    firstName: 'Sara',
    lastName: 'DummySeller',
    isAdmin: false
};

const DUMMY2_USER = {
    email: 'dummy2@test.com',
    userName: 'buyer',
    password: 'dummyTest_2',
    firstName: 'Flo',
    lastName: 'DummyBuyer',
    isAdmin: false
};

sequelize.sync().then( async () => {
    const saltRounds = 12;
    DUMMY2_USER.password = bcrypt.hashSync(DUMMY2_USER.password, saltRounds); // hashes the password, never store passwords as plaintext
    await User.create(DUMMY2_USER).then(() => console.log("dummy user 2 created"));
    DUMMY_USER.password = bcrypt.hashSync(DUMMY_USER.password, saltRounds); // hashes the password, never store passwords as plaintext
    return User.create(DUMMY_USER).then(() => console.log("dummy user created"));
})
.catch( err => console.log(err));
