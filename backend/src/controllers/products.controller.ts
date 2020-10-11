import express, { Router, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { verifyToken } from '../middlewares/checkAuth';
import { checkPasswordStrength } from '../middlewares/checkPasswordStrength';
import { checkIsAdmin } from '../middlewares/checkIsAdmin';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post(
  '/',
  verifyToken,
  (req: Request, res: Response) => {
    req.body = {
      ...req.body,
      approved: false,
    };
    productService
      .create(req.body)
      .then((product) => res.send(product))
      .catch((err) => res.status(500).send(err));
  }
);
productController.post(
  '/product/:productId/approve',
  verifyToken,
  checkIsAdmin,
  (req: Request, res: Response) => {}
);

productController.get(
  '/', // you can add middleware on specific requests like that
  (req: Request, res: Response) => {
    productService
      .getAll()
      .then((products) => res.send(products))
      .catch((err) => res.status(500).send(err));
  }
);

productController.get(
  '/toBeApproved', // you can add middleware on specific requests like that
  verifyToken,
  checkIsAdmin,
  (req: Request, res: Response) => {
    productService
      .getToBeApproved()
      .then((products) => res.send(products))
      .catch((err) => res.status(500).send(err));
  }
);

export const ProductController: Router = productController;
