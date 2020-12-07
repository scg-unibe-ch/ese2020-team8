import { Response, NextFunction } from 'express';
import { IAuthRequest } from './checkAuth';
import { Product } from '../models/product.model';
import { Op } from 'sequelize';

export async function checkBuyProduct(
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      console.error('need to call verifyToken before using this');
    }
    const product = await findProductThatShouldNotExist(
      req.params.productId,
      req.user.userId
    );
    if (product) {
      res
        .status(403)
        .send({ message: 'You can\'t buy this product!', name: 'BuyProduct' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

export async function findProductThatShouldNotExist(productId: number|string, userId: number|string) {
  return Product.findOne({
    where: {
      id: productId,
      [Op.or]: [
        {
          UserId: userId,
        },
        {
          status: {
            [Op.not]: 'approved',
          },
        },
      ],
    },
  });
}
