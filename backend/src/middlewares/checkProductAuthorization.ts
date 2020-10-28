import { Response, NextFunction } from 'express';
import {IAuthRequest} from './checkAuth';
import {Product} from '../models/product.model';

export async function checkProductAuthorization(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            console.error('need to call verifyToken before using this');
        }
        if (req.user.isAdmin) {
            next();
        } else {
            const product = await Product.findOne({
                where: {
                    id: req.params.productId,
                    UserId: req.user.userId
                }
            });
            if (product) {
                next();
            } else {
                res.status(403).send({ message: 'Unauthorized' });
            }
        }
    } catch (err) {
       next(err);
    }
}
