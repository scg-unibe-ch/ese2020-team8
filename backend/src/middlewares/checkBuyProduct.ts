import { Response, NextFunction } from 'express';
import {IAuthRequest} from './checkAuth';
import {Product} from '../models/product.model';

export async function checkBuyProduct(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            console.error('need to call verifyToken before using this');
        }
        const product = await Product.findOne({
            where: {
                id: req.params.productId,
                UserId: req.user.userId,
                status: !'approved'
            }
        });
        if (product) {
            res.status(403).send({ message: 'You can\'t buy this product!', name: 'BuyProduct' });
        } else {
            next();
        }
    } catch (err) {
       next(err);
    }
}
