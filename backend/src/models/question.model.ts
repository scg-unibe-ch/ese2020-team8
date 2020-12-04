import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {User} from './user.model';
import {Product} from './product.model';

export interface QuestionAttributes {
    id: number;
    UserId: number;
    ProductId: number;
    text: string;
}

// tells sequelize that todoItemId is not a required field
export interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> { }


export class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
    id: number;
    UserId!: number;
    ProductId!: number;
    text!: string;


    public static initialize(sequelize: Sequelize) { // definition for database
        Question.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ProductId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            text: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        { sequelize, tableName: 'questions' }
        );
    }

    public static createAssociations() {
        Question.belongsTo(User, {
            foreignKey: 'UserId'
        });
        User.hasMany(Question);
        Question.belongsTo(Product, {
            foreignKey: 'ProductId'
        });
        Product.hasMany(Question);
    }

}
