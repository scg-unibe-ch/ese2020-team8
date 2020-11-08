import {
  Transaction,
  TransactionCreationAttributes,
  TransactionAttributes,
} from '../models/transaction.model';

export class TransactionService {
  TransactionService = new TransactionService();
  public async get(transactionId: string) {
    return Transaction.findOne({
      where: {
        id: transactionId,
      },
    });
  }

  public async create(transaction: TransactionCreationAttributes) {
    return Transaction.create(transaction);
  }

  public async getProductTransactions(userId: number, productId: number) {
    return Transaction.findAll({
      where: {
        UserId: userId,
        ProductId: productId,
      },
      include: Transaction as any,
    });
  }


  public async getMyTransactions(userId: number) {
    return Transaction.findAll({
      where: {
        UserId: userId,
      },
      include: Transaction as any,
    });
  }
}
