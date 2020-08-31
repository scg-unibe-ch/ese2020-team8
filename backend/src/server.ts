    import express from "express";
import morgan from "morgan";
import { Application } from "express";
import { TodoItemController } from './controllers/todoitem.controller';
import { TodoListController } from './controllers/todolist.controller';
import { UserController } from "./controllers/user.controller";
import { SecuredController } from "./controllers/secured.controller";
import { Sequelize } from 'sequelize';
import { TodoList } from "./models/todolist.model";
import { TodoItem } from "./models/todoitem.model";
import { User } from "./models/user.model";

export class Server {
    private server: Application;
    private sequelize: Sequelize;
    private port = 3000;

    constructor() {
        this.server = this.configureServer();
        this.sequelize = this.configureSequelize();


        TodoItem.initialize(this.sequelize);
        TodoList.initialize(this.sequelize);
        User.initialize(this.sequelize);

        this.sequelize.sync().then(() => {                           // create connection to the database
            this.server.listen(this.port, () => {                                   // start server on specified port
                console.log(`server listening at http://localhost:${this.port}`);   // indicate that the server has started
            });
        });

    }

    private configureServer(): Application {
        return express()
            .use(express.json())                    // parses an incoming json to an object
            .use(morgan('tiny'))                    // logs incoming requests
            .use(this.corsConfig)
            .use('/todoitem', TodoItemController)   // any request on this path is forwarded to the TodoItemController
            .use('/todolist', TodoListController)
            .use('/user',  UserController)
            .use('/secured', SecuredController)
            .get('/', (req, res) => res.send("<h1>Welcome to the ESE-2020 Course</h1><span style=\"font-size:100px;\">&#127881;</span>"));
    }

    private configureSequelize(): Sequelize {
        return new Sequelize({
            dialect: 'sqlite',
            storage: 'db.sqlite',
            logging: false // can be set to true for debugging
        });
    }

    private corsConfig(req: any, res: any, next: any) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    }
}

const server = new Server();