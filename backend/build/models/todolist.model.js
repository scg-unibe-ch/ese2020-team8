"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
const sequelize_1 = require("sequelize");
const todoitem_model_1 = require("./todoitem.model");
;
class TodoList extends sequelize_1.Model {
    static initialize(sequelize) {
        TodoList.init({
            todoListId: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            }
        }, { tableName: "todolists", sequelize });
        TodoList.hasMany(todoitem_model_1.TodoItem, {
            sourceKey: "todoListId",
            foreignKey: "todoListId",
            as: "todoItems"
        });
    }
}
exports.TodoList = TodoList;
//# sourceMappingURL=todolist.model.js.map