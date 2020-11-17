import express, { Application } from 'express';
import morgan from 'morgan';
import { Sequelize } from 'sequelize';
import { User } from './models/user.model';
import {Product} from './models/product.model';
import {Photo} from './models/photo.model';
import {Transaction} from './models/transaction.model';
import {Notification} from './models/notification.model';
import { notificationService } from './services/notification.service';

import cors from 'cors';
import {ApiController} from './api';

export class Server {
    private server: Application;
    public sequelize: Sequelize;
    private port = process.env.PORT || 3000;

    constructor() {
        this.server = this.configureServer();
    }

    public async start() {
        this.sequelize = this.configureSequelize();
        User.initialize(this.sequelize);
        Product.initialize(this.sequelize);
        Photo.initialize(this.sequelize);
        Transaction.initialize(this.sequelize);
        Notification.initialize(this.sequelize);
        User.createAssociations();
        Product.createAssociations();
        Photo.createAssociations();
        Transaction.createAssociations();
        Notification.createAssociations();

        await notificationService.prepareAccounts();

        this.sequelize.sync().then(() => {                           // create connection to the database
            this.server.listen(this.port, () => {                                   // start server on specified port
                console.log(`server listening at http://localhost:${this.port}`);   // indicate that the server has started
            });
        });
    }

    private configureServer(): Application {
        // options for cors middleware
        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: `http://localhost:${this.port}`,
            preflightContinue: false,
        };

        return express()
            .use(cors())
            .use(express.json())                    // parses an incoming json to an object
            .use(morgan('tiny'))                    // logs incoming requests
            .use('/api', ApiController)
            .options('*', cors(options))
            .use(express.static('./src/public'))
            // this is the message you get if you open http://localhost:3000/ when the server is running
            .get('/', (_req, res) => res.send('<h1>Welcome to the ESE-2020 Backend Scaffolding <span style="font-size:50px">&#127881;</span></h1>'));
    }

    private configureSequelize(): Sequelize {
        return new Sequelize({
            dialect: 'sqlite',
            storage: 'db.sqlite',
            logging: false // can be set to true for debugging
        });
    }

    public getServer() {
        return this.server;
    }
}

