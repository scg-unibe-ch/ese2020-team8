
import express, { Router, Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken, IAuthRequest } from '../middlewares/checkAuth';
import {checkPasswordStrength} from '../middlewares/checkPasswordStrength';
import {checkIsAdmin} from '../middlewares/checkIsAdmin';

const userController: Router = express.Router();
export const userService = new UserService();

userController.post('/register', checkPasswordStrength,
    (req: Request, res: Response) => {
        userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(400).send(err));
    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(403).send(err));
    }
);

userController.get('/me',
    verifyToken, // you can add middleware on specific requests like that
    async (req: IAuthRequest, res: Response, next: NextFunction) => {
        try {
            const user = await userService.get(req.user.userId);
            delete user.password;
            res.send(user);
        } catch (err) {
            next(err);
        }
    }
);

userController.get('/',
    verifyToken, // you can add middleware on specific requests like that
    checkIsAdmin,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            return userService.getAll().then(users => res.send(users)).catch(err => res.status(500).send(err));
        } catch (err) {
            next(err);
        }
    }
);

// error here...
userController.put('/me',
    verifyToken,
    async (req: IAuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;
            const user = await userService.update(userId, req.body);
            res.send(user);
        } catch (err) {
            next(err);
        }
    }
);

export const UserController: Router = userController;
