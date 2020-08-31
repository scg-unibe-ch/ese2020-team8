"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    try {
        const secret = 'secure';
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (decoded == null) {
            res.status(403).send({ message: 'Not Authorized' });
        }
        req.body.tokenPayload = decoded;
        console.log(req.body.tokenPayload);
        next();
    }
    catch (err) {
        console.log(err);
        res.status(403).send({ message: 'Not Authorized' });
    }
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=checkAuth.js.map