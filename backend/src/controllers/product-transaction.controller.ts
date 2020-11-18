import express, { Router, Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transaction.service';
import { IAuthRequest } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';
import {userService} from '../services/user.service';
import {notificationService} from '../services/notification.service';

const productTransactionController: Router = express.Router({ mergeParams: true});
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

      const rentalDays: number = req.body.rentalDays;
      const deliveryAddress: IDeliveryAddress = req.body.deliveryAddress;

      const productId = req.params.productId;
      const product = await productService.get(productId);
      const transactions = await transactionService.create(product, buyerId, rentalDays, deliveryAddress);
      res.send(transactions);
      const buyer = await userService.getUserFromToken(req.user);
      const seller = await userService.get(product.UserId);

      await notificationService.transactionSellerNotification(seller.email, transactions, product);
      await notificationService.transactionBuyerNotification(buyer.email, transactions, product);
      await notificationService.addNotification(seller.id, transactions.id, 'sellerNotification', buyer.email);
      await notificationService.addNotification(buyer.id, transactions.id, 'buyerNotification', seller.email);

    } catch (err) {
      next(err);
    }
  }
);

interface ICreateTransactionRequestBody {
  rentalDays?: number;
  address?: IDeliveryAddress;
}

export interface IDeliveryAddress {
  firstName: string;
  lastName: string;
  streetNr: string;
  zip: number;
  city: string;
}


export const ProductTransactionController: Router = productTransactionController;
