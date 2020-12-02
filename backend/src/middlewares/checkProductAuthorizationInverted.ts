import { Response, NextFunction } from 'express';
import {IAuthRequest} from './checkAuth';
import {Product} from '../models/product.model';

export async function checkProductAuthorizationInverted(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            console.error('need to call verifyToken before using this');
        }
        const product = await Product.findOne({
            where: {
                id: req.params.productId,
                UserId: req.user.userId
            }
        });
        if (product) {
            res.status(403).send({ message: 'You can\'t buy your own product!', type: 'BuyOwnProduct' });
        } else {
            next();
        }
    } catch (err) {
       next(err);
    }
}
