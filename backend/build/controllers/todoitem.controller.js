"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemController = void 0;
const express_1 = __importDefault(require("express"));
const todoitem_model_1 = require("../models/todoitem.model");
const todoitemController = express_1.default.Router();
todoitemController.use((req, res, next) => {
    console.log("hello from todoItemcontroller");
    next();
});
todoitemController.post('/', (req, res) => {
    const temp = req.body;
    todoitem_model_1.TodoItem.create(temp)
        .then(inserted => res.send(inserted))
        .catch(err => {
        console.log(err);
        console.log(req.body);
        res.status(500).send(err);
    });
});
exports.TodoItemController = todoitemController;
//# sourceMappingURL=todoitem.controller.js.map