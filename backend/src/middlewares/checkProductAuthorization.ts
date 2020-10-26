import { Response, NextFunction } from 'express';
import {IAuthRequest} from './checkAuth';
import {Product} from '../models/product.model';

export async function checkProductAuthorization(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
        if (req.user.isAdmin) {
            next();
        }
        const product = await Product.findOne({
            where: {
                id: req.body.id,
                UserId: req.user.id
            }
        });
        if (product) {
            next();
        } else {
            res.status(403).send({ message: 'Unauthorized' });
        }
    } catch (err) {
       next(err);
    }
}
