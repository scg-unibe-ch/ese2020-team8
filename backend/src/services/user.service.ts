
import { Request, Response } from 'express';
import { UserAttributes, User } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {

    public register(req: Request, res: Response) {
        const user: UserAttributes = req.body;
        const saltRounds = 12;
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        User.create(user).then(inserted => res.send(inserted)).catch(err => res.status(500).send(err));
    }

    public login(req: Request, res: Response) {

        const secret = process.env.JWT_SECRET;
        const loginRequestee: UserAttributes = req.body;
        User.findOne({
            where: {
                userName: loginRequestee.userName
            }
        }).then(user => {
            if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash with the password from the lognin request
                const token = jwt.sign({ userName: user.userName, userId: user.userId }, secret, { expiresIn: '2h' });
                res.send({ user, token });
            } else {
                res.status(403).send();
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
    }

}