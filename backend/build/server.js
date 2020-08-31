"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const todoitem_controller_1 = require("./controllers/todoitem.controller");
const todolist_controller_1 = require("./controllers/todolist.controller");
const user_controller_1 = require("./controllers/user.controller");
const secured_controller_1 = require("./controllers/secured.controller");
const sequelize_1 = require("sequelize");
const todolist_model_1 = require("./models/todolist.model");
const todoitem_model_1 = require("./models/todoitem.model");
const user_model_1 = require("./models/user.model");
class Server {
    constructor() {
        this.port = 3000;
        this.server = this.configureServer();
        this.sequelize = this.configureSequelize();
        todoitem_model_1.TodoItem.initialize(this.sequelize);
        todolist_model_1.TodoList.initialize(this.sequelize);
        user_model_1.User.initialize(this.sequelize);
        this.sequelize.sync().then(() => {
            this.server.listen(this.port, () => {
                console.log(`server listening at http://localhost:${this.port}`);
            });
        });
    }
    configureServer() {
        return express_1.default()
            .use(express_1.default.json())
            .use(morgan_1.default('tiny'))
            .use(this.corsConfig)
            .use('/todoitem', todoitem_controller_1.TodoItemController)
            .use('/todolist', todolist_controller_1.TodoListController)
            .use('/user', user_controller_1.UserController)
            .use('/secured', secured_controller_1.SecuredController)
            .get('/', (req, res) => res.send("<h1>Welcome to the ESE-2020 Course</h1><span style=\"font-size:100px;\">&#127881;</span>"));
    }
    configureSequelize() {
        return new sequelize_1.Sequelize({
            dialect: 'sqlite',
            storage: 'db.sqlite',
            logging: false
        });
    }
    corsConfig(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    }
}
exports.Server = Server;
const server = new Server();
//# sourceMappingURL=server.js.map