"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const user_service_1 = require("../services/user.service");
const userController = express_1.default.Router();
const userService = new user_service_1.UserService();
userController.post('/register', userService.register);
userController.post('/login', userService.login);
userController.get('/', (re1, res) => {
    user_model_1.User.findAll().then(users => res.send(users)).catch(err => res.send(err));
});
exports.UserController = userController;
//# sourceMappingURL=user.controller.js.map