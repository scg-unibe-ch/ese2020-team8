import express, { Router, Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transaction.service';
import { verifyToken, IAuthRequest } from '../middlewares/checkAuth';

const transactionController: Router = express.Router();
const transactionService = new TransactionService();

// get all transactions of user
transactionController.get(
  '/me',
  verifyToken,
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const transactions = await transactionService.getMyTransactions(req.user.userId);
      res.send(transactions);
    } catch (err) {
      next(err);
    }
  }
);

// get specific transaction
transactionController.get(
  '/:transactionId',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactions = await transactionService.get(req.params.transactionId);
      res.send(transactions);
    } catch (err) {
      next(err);
    }
  }
);

// get all transactions from specific product
transactionController.get(
  '/:productId/transaction',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactions = await transactionService.get(req.params.productId);
      res.send(transactions);
    } catch (err) {
      next(err);
    }
  }
);

export const TransactionController: Router = transactionController;
