import express, { Router, Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { verifyToken, IAuthRequest } from '../middlewares/checkAuth';
import { checkIsAdmin } from '../middlewares/checkIsAdmin';
import { checkIsOwner } from '../middlewares/checkIsOwner';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post(
  '/',
  verifyToken,
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const product = await productService.create(req.body, userId);
      res.send(product);
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
      res.send(product);
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
  '/:productId/delete',
  verifyToken,
  checkIsOwner,
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

export const ProductController: Router = productController;
