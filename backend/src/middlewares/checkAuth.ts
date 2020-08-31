import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export function verifyToken(req: Request, res: Response, next: any) {
    try {
        const secret = 'secure';
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret);
        if (decoded == null) {
            res.status(403).send({ message: 'Not Authorized' });
        }
        req.body.tokenPayload = decoded;
        console.log(req.body.tokenPayload);
        next();
    } catch (err) {
        console.log(err);
        res.status(403).send({ message: 'Not Authorized' });
    }
}