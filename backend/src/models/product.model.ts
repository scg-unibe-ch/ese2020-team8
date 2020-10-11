import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { TodoList } from './todolist.model';

export interface ProductAttributes {
    productId: number;
    name: string;
    price: number;
    approved: boolean;
}

// tells sequelize that todoItemId is not a required field
export interface ProductCreationAttributes extends Optional<Product, 'productId'> { }


export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId!: number;
    name!: string;
    price!: number;
    approved!: boolean;


    public static initialize(sequelize: Sequelize) { // definition for database
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            approved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
        },
        { sequelize, tableName: 'products' }
        );

    }
    // public static createAssociations() {
    //     Product.belongsTo(TodoList, {
    //         targetKey: 'todoListId',
    //         as: 'todoList',
    //         onDelete: 'cascade',
    //         foreignKey: 'todoListId'
    //     });
    // }

}
