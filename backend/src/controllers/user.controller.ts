
import express, { Router } from "express";
import { User } from '../models/user.model'
import { UserService } from '../services/user.service'
import { verifyToken } from "../middlewares/checkAuth";

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register', userService.register); // uses userService.register method for any POST reqeust on that route
userController.post('/login', userService.login);
userController.get('/', verifyToken, (re1, res) => { // you can add middleware on specific requests like that
    User.findAll().then(users => res.send(users)).catch(err => res.send(err));
})

export const UserController: Router = userController;