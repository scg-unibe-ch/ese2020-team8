
import express, { Router, Request, Response, Application } from "express";
import { User } from '../models/user.model'
import { UserService }from '../services/user.service'

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register', userService.register);
userController.post('/login', userService.login);
userController.get('/', (re1,res) => {
    User.findAll().then(users => res.send(users)).catch(err => res.send(err));
})

export const UserController: Router = userController;