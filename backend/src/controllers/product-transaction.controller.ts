import express, { Router, Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transaction.service';
import { verifyToken, IAuthRequest } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';

const productTransactionController: Router = express.Router();
const transactionService = new TransactionService();
const productService = new ProductService();

// get all transactions from specific product
productTransactionController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.productId;
      const transactions = await transactionService.get(productId);
      res.send(transactions);
    } catch (err) {
      next(err);
    }
  }
);

productTransactionController.post(
  '/',
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const buyerId = req.user.userId;
      const rentalDays = req.body.rentalDays;
      const productId = req.params.productId;
      const product = await productService.get(productId);
      const transactions = await transactionService.create(product, buyerId, rentalDays);
      res.send(transactions);
    } catch (err) {
      next(err);
    }
  }
);

export const ProductTransactionController: Router = productTransactionController;
