import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export function verifyToken(req: Request, res: Response, next: any) {// this way you can just define a function and export it instead of a whole class
    try {
        const secret = process.env.JWT_SECRET; // get secret key from environment (defined in nodemon.json)
        const token = req.headers.authorization.split(" ")[1]; // since the Authorizationheader consists of "Bearer <token>" where <token> is a JWT token
        const decoded = jwt.verify(token, secret);
        if (decoded == null) {
            res.status(403).send({ message: 'Unauthorized' });
        }
        req.body.tokenPayload = decoded; // adds the field "tokenPayload" to the request enabling following functions to use data from the token
        next();
    } catch (err) {
        res.status(403).send({ message: 'Unauthorized' });
    }
}