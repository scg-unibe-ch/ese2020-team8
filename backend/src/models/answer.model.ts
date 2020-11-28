import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {User} from './user.model';
import {Question} from './question.model';

export interface AnswerAttributes {
    id: number;
    UserId: number;
    QuestionId: number;
    text: string;
}

export interface AnswerCreationAttributes extends Optional<AnswerAttributes, 'id'> { }


export class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> implements AnswerAttributes {
    id: number;
    UserId!: number;
    QuestionId!: number;
    text!: string;


    public static initialize(sequelize: Sequelize) { // definition for database
        Answer.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            QuestionId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            text: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        { sequelize, tableName: 'answers' }
        );
    }

    public static createAssociations() {
        Answer.belongsTo(User, {
            foreignKey: 'UserId'
        });
        User.hasMany(Answer);
        Answer.belongsTo(Question, {
            foreignKey: 'QuestionId'
        });
        Question.hasOne(Answer);
    }

}
