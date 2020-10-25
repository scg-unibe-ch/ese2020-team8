import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface ProductAttributes {
    productId: number;
    title: string;
    description: string;
    status: string;
    owner: number;
}

// tells sequelize that todoItemId is not a required field
export interface ProductCreationAttributes extends Optional<Product, 'productId'> { }


export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId!: number;
    title!: string;
    description!: string;
    status!: string;
    owner!: number;


    public static initialize(sequelize: Sequelize) { // definition for database
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'pending',
                validate: {
                    isIn: [['pending', 'approved', 'inactive']],
                }
            },
            owner: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
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
