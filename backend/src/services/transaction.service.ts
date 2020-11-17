import { Product } from '../models/product.model';
import { Transaction } from '../models/transaction.model';
import { User } from '../models/user.model';
import { server } from '../';
import { Photo } from '../models/photo.model';

export class TransactionService {
  public async get(transactionId: string) {
    return Transaction.findOne({
      where: {
        id: transactionId,
      },
    });
  }

  public async create(product: Product, buyerId: number, rentalDays: number, deliveryAddress: any) {
    const transaction = {
      price: product.price,
      ProductId: product.id,
      productType: product.productType,
      purchaseType: product.purchaseType,
      buyerId: buyerId,
      rentalDays: rentalDays,
      deliveryAddress: deliveryAddress
    };

    const t = await server.sequelize.transaction();

    try {
      const buyer = await User.findOne({
        where: {
          id: buyerId,
        },
      });

      const seller = await User.findOne({
        where: {
          id: product.UserId,
        },
      });
      buyer.wallet -= product.price;
      seller.wallet += product.price;

      // set product status to sold for good
      if (product.productType === 'good' && product.purchaseType === 'buy') {
        product.status = 'sold';
      }
      // set product status to inavailable meaning 'rent out' for good
      if (product.productType === 'good' && product.purchaseType === 'rent') {
        product.availability = false;
        product.status = 'rent';
      }

      buyer.save({ transaction: t });
      seller.save({ transaction: t });
      product.save({ transaction: t });

      const transactionResult = await Transaction.create(transaction, {
        transaction: t,
      });
      // If the execution reaches this line, no errors were thrown.
      // We commit the transaction.
      await t.commit();
      return transactionResult;
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await t.rollback();
      throw error;
    }
  }

  public async getProductTransactions(userId: number, productId: number) {
    return Transaction.findAll({
      where: {
        buyerId: userId,
        ProductId: productId,
      },
      include: Product as any,
    });
  }

  public async getMyTransactions(userId: number) {
    return Transaction.findAll({
      where: {
        buyerId: userId,
      },
      include: {
        model: Product as any,
        include: Photo as any,
      },
    });
  }
}
