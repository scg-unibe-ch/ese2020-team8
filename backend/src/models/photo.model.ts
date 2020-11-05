
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {User} from './user.model';
import {Product} from './product.model';

export interface PhotoAttributes {
    id: number;
    UserId: number;
    fileName: string;
    ProductId: number;
}

// tells sequelize that todoItemId is not a required field
export interface PhotoCreationAttributes extends Optional<Photo, 'id'> { }


export class Photo extends Model<PhotoAttributes, PhotoCreationAttributes> implements PhotoAttributes {
    id: number;
    UserId!: number;
    fileName!: string;
    ProductId!: number;


    public static initialize(sequelize: Sequelize) { // definition for database
        Photo.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            UserId: {
                type: DataTypes.INTEGER,
            },
            ProductId: {
                type: DataTypes.INTEGER,
            },
            fileName: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        { sequelize, tableName: 'images' }
        );

    }

    public static createAssociations() {
        Photo.belongsTo(User);
        Photo.belongsTo(Product);
    }

}
