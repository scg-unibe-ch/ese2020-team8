import { Sequelize } from 'sequelize';
import { User } from '../src/models/user.model';
import bcrypt from 'bcrypt';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false // can be set to true for debugging
});

User.initialize(sequelize);

const DUMMY_USER = {
    email: 'dummy1@test.com',
    userName: 'Dummy1',
    password: 'dummyTest_1',
    firstName: 'Sara',
    lastName: 'Dummy',
    isAdmin: false
};

sequelize.sync().then( () => {
    const saltRounds = 12;
    DUMMY_USER.password = bcrypt.hashSync(DUMMY_USER.password, saltRounds); // hashes the password, never store passwords as plaintext
    return User.create(DUMMY_USER).then(() => console.log("dummy user created"));
})
.catch( err => console.log(err));

const DUMMY2_USER = {
    email: 'dummy2@test.com',
    userName: 'Dummy2',
    password: 'dummyTest_2',
    firstName: 'Flo',
    lastName: 'Dummy',
    isAdmin: false
};

sequelize.sync().then( () => {
    const saltRounds = 12;
    DUMMY2_USER.password = bcrypt.hashSync(DUMMY2_USER.password, saltRounds); // hashes the password, never store passwords as plaintext
    return User.create(DUMMY2_USER).then(() => console.log("dummy user 2 created"));
})
.catch( err => console.log(err));
