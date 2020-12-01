import {
  Model,
  Sequelize,
  DataTypes,
  Optional,
} from 'sequelize';
import {User} from './user.model';
import {Product} from './product.model';

export interface FavoriteAttributes {
    id: number;
    userId: number;
    productId: number;
}

export interface FavoriteCreationAttributes extends Optional<FavoriteAttributes, 'id'> { }

export class Favorite
  extends Model<FavoriteAttributes, FavoriteCreationAttributes>
  implements FavoriteAttributes {

  id!: number;
  userId!: number;
  productId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    Favorite.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
      },
      { sequelize, tableName: 'favorites' }
    );
  }

  public static createAssociations() {
    Favorite.belongsTo(User, {foreignKey: 'userId'});
    Favorite.belongsTo(Product, {foreignKey: 'productId'});
    Product.hasMany(Favorite);
    User.hasMany(Favorite);
  }
}
