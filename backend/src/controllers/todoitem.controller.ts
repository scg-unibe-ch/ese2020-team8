import express from "express";
import { Router } from "express";
import { TodoItem } from "../models/todoitem.model";

const todoitemController: Router = express.Router();

todoitemController.use((req, res, next) => {
    console.log("hello from todoItemcontroller");
    next();
});

todoitemController.post('/', (req, res) => {
    const temp: TodoItem = req.body;
    TodoItem.create(temp)
        .then(inserted => res.send(inserted))
        .catch(err => {
            console.log(err);
            console.log(req.body);
            res.status(500).send(err);
        });
})

todoitemController.delete('/:id', (req, res) => {
    TodoItem.findByPk(req.params.id)
    .then(found => found.destroy().then(item => res.status(200).send()))
    .catch(err => res.status(500).send(err));
})

export const TodoItemController: Router = todoitemController;