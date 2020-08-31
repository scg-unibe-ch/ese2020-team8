"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    register(req, res) {
        const user = req.body;
        const saltRounds = 12;
        user.password = bcrypt_1.default.hashSync(user.password, saltRounds);
        user_model_1.User.create(user).then(inserted => res.send(inserted)).catch(err => res.status(500).send(err));
    }
    login(req, res) {
        const secret = 'secure';
        const user = req.body;
        user_model_1.User.findOne({
            where: {
                userName: user.userName
            }
        }).then(found => {
            if (bcrypt_1.default.compareSync(user.password, found.password)) {
                const token = jsonwebtoken_1.default.sign({ "userName": found.userName, "userId": found.userId }, secret, { expiresIn: '2h' });
                res.send({ user: found, token });
            }
            else {
                res.status(403).send();
            }
        })
            .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map