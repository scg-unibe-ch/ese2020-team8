import { Optional, Model, Sequelize, DataTypes, HasManyGetAssociationsMixin } from 'sequelize';
import {User} from './user.model';
import {Photo} from './photo.model';

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
    rentalDays?: number;
}

// tells sequelize that todoItemId is not a required field
export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }


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
    rentalDays?: number;

    public getPhotos!: HasManyGetAssociationsMixin<Photo>;


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
                type: DataTypes.DECIMAL(19, 2),
                allowNull: false
            },
            productType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [['good', 'service']],
                }
            },
            purchaseType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [['rent', 'buy']],
                }
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
                    isIn: [['pending', 'approved', 'rejected', 'inactive', 'sold', 'rent']],
                }
            },
            rentalDays: {
                type: DataTypes.INTEGER,
            },
        },
        { sequelize, tableName: 'products' }
        );

    }

    public static createAssociations() {
        Product.belongsTo(User);
        Product.hasMany(Photo);
    }

}
