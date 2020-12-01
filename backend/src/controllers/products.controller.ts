import express, { Router, Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { verifyToken, IAuthRequest } from '../middlewares/checkAuth';
import { checkIsAdmin } from '../middlewares/checkIsAdmin';
import {checkProductAuthorization} from '../middlewares/checkProductAuthorization';
import {checkProductAuthorizationInverted} from '../middlewares/checkProductAuthorizationInverted';
import { ProductTransactionController } from './product-transaction.controller';
import { FavoriteService } from '../services/favorite.service';
import { notificationService } from '../services/notification.service';


const productController: Router = express.Router();
const productService = new ProductService();
const favoriteService = new FavoriteService();

productController.post(
  '/',
  verifyToken,
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const product = await productService.create(req.body, userId);
      res.send(product);
      await notificationService.addStatusNotification(userId, product.id, 'pendingNotification', );
    } catch (err) {
      next(err);
    }
  }
);


productController.put(
  '/:productId/approve',
  verifyToken,
  checkIsAdmin,
  async (req: Request<{productId: string}>, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.productId;
      const product = await productService.approve(productId);
      const userId = product.UserId;
      res.send(product);
      await notificationService.addStatusNotification(userId, product.id, 'approvalNotification', );
    } catch (err) {
      return next(err);
    }
  }
);



productController.put(
  '/:productId/reject',
  verifyToken,
  checkIsAdmin,
  async (req: Request<{productId: string}>, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.productId;
      const product = await productService.reject(productId);
      const userId = product.UserId;
      res.send(product);
      await notificationService.addStatusNotification(userId, product.id, 'rejectionNotification', );
    } catch (err) {
      return next(err);
    }
  }
);



productController.get(
  '/', // you can add middleware on specific requests like that
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getAll();
      res.send(products);
    } catch (err) {
      next(err);
    }
  }
);


productController.get(
  '/me', // you can add middleware on specific requests like that
  verifyToken,
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getMyProducts(req.user.userId);
      res.send(products);
    } catch (err) {
      next(err);
    }
  }
);

productController.get(
  '/pending', // you can add middleware on specific requests like that
  verifyToken,
  checkIsAdmin,
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getToBeApproved();
      res.send(products);
    } catch (err)  {
      next(err);
    }
  }
);

productController.delete(
  '/:productId',
  verifyToken,
  checkProductAuthorization,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.productId;
      const product = await productService.delete(productId);
      res.send(product);
    } catch (err) {
      next(err);
    }
  }
);

productController.get(
  '/:productId', // you can add middleware on specific requests like that
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.get(req.params.productId);
      res.send(products);
    } catch (err) {
      next(err);
    }
  }
);


productController.put(
  '/:productId',
  verifyToken,
  checkProductAuthorization,
  async (req: Request<{productId: string}>, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.productId;
      const product = await productService.update(productId, req.body);
      res.send(product);
    } catch (err) {
      return next(err);
    }
  }
);

productController.use(
  '/:productId/transactions',
  verifyToken,
  checkProductAuthorizationInverted,
  ProductTransactionController
);

productController.post(
  '/:productId/favorites',
  verifyToken,
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const productId = req.body.productId;
      const favorites = await favoriteService.create(userId, productId);
      res.send(favorites);
    } catch (err) {
      next(err);
    }
  }
);


export const ProductController: Router = productController;
