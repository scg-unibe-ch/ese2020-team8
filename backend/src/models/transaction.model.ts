import {
  Optional,
  Model,
  Sequelize,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
} from 'sequelize';
import {User} from './user.model';
import {Product} from './product.model';

export interface TransactionAttributes {
    id: number;
    price: string;
    ProductId: number;
    productType: string;
    purchaseType: string;
    UserId: number;
    rentalDays: number;
}

export interface TransactionCreationAttributes extends Optional<Product, 'id'> { }

export class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes {

  public static associations: {
    transaction: Association<Transaction, Product>;
  };
  id!: number;
  price!: string;
  ProductId!: number;
  productType!: string;
  purchaseType!: string;
  UserId!: number;
  rentalDays!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

//   public getTransaction!: HasManyGetAssociationsMixin<Transaction>; // Note the null assertions!
//   public addTransaction!: HasManyAddAssociationMixin<Transaction, number>;
//   public hasTransaction!: HasManyHasAssociationMixin<Transaction, number>;

  public static initialize(sequelize: Sequelize) {
    // definition for database
    Transaction.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        price: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ProductId: {
          type: DataTypes.INTEGER,
        },
        productType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        purchaseType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        UserId: {
          type: DataTypes.INTEGER,
        },
        rentalDays: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize, tableName: 'transactions' }
    );
  }

  public static createAssociations() {
    Transaction.belongsTo(User);
    User.hasMany(Transaction);
    Transaction.belongsTo(Product);
    Product.hasMany(Transaction);
  }
}
