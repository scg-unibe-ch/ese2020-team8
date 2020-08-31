import express from "express";
import { Router } from "express";
import { TodoList } from "../models/todolist.model";

const todoListController: Router = express.Router();

todoListController.use((req, res, next) => {
    console.log("hello from todoListController");
    next();
});

todoListController.post('/', (req, res) => {
    const temp: TodoList = req.body;
    TodoList.create(temp).then(created => {
        res.status(201).send(created);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    })
});

todoListController.get('/', (req,res ) => {
    TodoList.findAll({include:[TodoList.associations.todoItems]}).then(list => res.status(200).send(list));
});

export const TodoListController: Router = todoListController;