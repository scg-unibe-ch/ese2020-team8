"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListController = void 0;
const express_1 = __importDefault(require("express"));
const todolist_model_1 = require("../models/todolist.model");
const todoListController = express_1.default.Router();
todoListController.use((req, res, next) => {
    console.log("hello from todoListController");
    next();
});
todoListController.post('/', (req, res) => {
    const temp = req.body;
    todolist_model_1.TodoList.create(temp).then(created => {
        res.status(201).send(created);
    })
        .catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});
todoListController.delete('/:id', (req, res) => {
    todolist_model_1.TodoList.findByPk(req.params.id).then(found => found.destroy().then(item => res.status(200).send())).catch(err => res.status(500).send(err));
});
todoListController.get('/', (req, res) => {
    todolist_model_1.TodoList.findAll({ include: [todolist_model_1.TodoList.associations.todoItems] }).then(list => res.status(200).send(list));
});
exports.TodoListController = todoListController;
//# sourceMappingURL=todolist.controller.js.map