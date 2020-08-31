"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItem = void 0;
const sequelize_1 = require("sequelize");
class TodoItem extends sequelize_1.Model {
    static initialize(sequelize) {
        TodoItem.init({
            todoItemId: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            done: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false
            },
            todoListId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            }
        }, { sequelize, tableName: 'todoItems' });
    }
}
exports.TodoItem = TodoItem;
//# sourceMappingURL=todoitem.model.js.map