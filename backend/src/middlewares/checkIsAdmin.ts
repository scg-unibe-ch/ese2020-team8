import { Response, NextFunction } from 'express';
import {IAuthRequest} from './checkAuth';

// this way you can just define a function and export it instead of a whole class
export function checkIsAdmin(req: IAuthRequest, res: Response, next: NextFunction) {
    if (req.user) {
        if (req.user.isAdmin) {
            next();
        }
    } else {
        res.status(403).send({ message: 'Unauthorized. You have to be admin to perform this action.', type: 'NotAdmin'});
    }
}
