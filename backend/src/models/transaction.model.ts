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
    price: number;
    ProductId: number;
    productType: string;
    purchaseType: string;
    buyerId: number;
    rentalDays?: number;
    totalPrice?: number;
    firstName?: string;
    lastName?: string;
    streetNr?: string;
    zip?: number;
    city?: string;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> { }

export class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes {

  id!: number;
  price!: number;
  ProductId!: number;
  productType!: string;
  purchaseType!: string;
  buyerId!: number;
  rentalDays?: number;
  totalPrice?: number;
  firstName?: string;
  lastName?: string;
  streetNr?: string;
  zip?: number;
  city?: string;

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
          type: DataTypes.DECIMAL(19, 2),
          allowNull: false,
        },
        ProductId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        productType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        purchaseType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        buyerId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        rentalDays: {
          type: DataTypes.INTEGER,
        },
        totalPrice: {
          type: DataTypes.INTEGER,
        },
        firstName: {
          type: DataTypes.STRING,
        },
        lastName: {
          type: DataTypes.STRING,
        },
        streetNr: {
          type: DataTypes.STRING,
        },
        zip: {
          type: DataTypes.INTEGER,
        },
        city: {
          type: DataTypes.STRING,
        }
      },
      { sequelize, tableName: 'transactions' }
    );
  }

  public static createAssociations() {
    Transaction.belongsTo(User, {foreignKey: 'buyerId'});
    User.hasMany(Transaction);
    Transaction.belongsTo(Product);
    Product.hasMany(Transaction);
  }
}
