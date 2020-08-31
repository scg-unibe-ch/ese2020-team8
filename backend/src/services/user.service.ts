
import { Request, Response } from 'express';
import { UserAttributes, User } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {


    public register(req: Request, res: Response) {
        const user: UserAttributes = req.body;
        const saltRounds = 12;
        user.password = bcrypt.hashSync(user.password, saltRounds);
        User.create(user).then(inserted => res.send(inserted)).catch(err => res.status(500).send(err));
    }

    public login(req: Request, res: Response) {

        const secret = 'secure';
        const user: UserAttributes = req.body;
        User.findOne({
            where: {
                userName: user.userName
            }
        }).then(found => {
            if (bcrypt.compareSync(user.password, found.password)) {
                const token = jwt.sign({ "userName": found.userName, "userId": found.userId }, secret, { expiresIn: '2h' });
                res.send({ user: found, token });
            } else {
                res.status(403).send();
            }
        })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }


}