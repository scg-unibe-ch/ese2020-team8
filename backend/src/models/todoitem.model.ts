import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface TodoItemAttributes {
    todoItemId: number;
    name: string;
    done: string;
    todoListId: number;
}


export interface TodoItemCreationAttributes extends Optional<TodoItem, "todoItemId"> { }


export class TodoItem extends Model<TodoItemAttributes, TodoItemCreationAttributes> implements TodoItemAttributes {
    todoItemId!: number;
    name!: string;
    done!: string;
    todoListId!: number;


    public static initialize(sequelize: Sequelize) {
        TodoItem.init({
            todoItemId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            done: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            todoListId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
            { sequelize, tableName: 'todoItems' }
        );
    }
}