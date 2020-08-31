"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecuredController = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../middlewares/checkAuth");
const securedEndpoint = express_1.default.Router();
securedEndpoint.use(checkAuth_1.verifyToken);
securedEndpoint.get('/', (req, res) => {
    res.send({ message: `This is a secured Endpoint, ${req.body.tokenPayload.userName}` });
});
exports.SecuredController = securedEndpoint;
//# sourceMappingURL=secured.controller.js.map