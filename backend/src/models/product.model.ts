import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {User} from './user.model';

export interface ProductAttributes {
    id: number;
    title: string;
    description: string;
    price: number;
    productType: string;
    purchaseType: string;
    availability: boolean;
    location: string;
    delivery: boolean;
    status: string;
    UserId: number;
    duration: number;
}

// tells sequelize that todoItemId is not a required field
export interface ProductCreationAttributes extends Optional<Product, 'id'> { }


export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    id!: number;
    title!: string;
    description!: string;
    price!: number;
    productType!: string;
    purchaseType!: string;
    availability!: boolean;
    location!: string;
    delivery!: boolean;
    status!: string;
    UserId!: number;
    duration!: number;


    public static initialize(sequelize: Sequelize) { // definition for database
        Product.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            UserId: {
                type: DataTypes.INTEGER,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            productType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            purchaseType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            availability: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            delivery: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'pending',
                validate: {
                    isIn: [['pending', 'approved', 'inactive']],
                }
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        },
        { sequelize, tableName: 'products' }
        );

    }

    public static createAssociations() {
        Product.belongsTo(User);
    }

}
