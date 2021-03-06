import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {Product} from './product.model';

export interface UserAttributes {
    id: number;
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin?: boolean;
    gender?: string;
    phone?: string;
    street?: string;
    zip?: string;
    city?: string;
    country?: string;
    wallet?: number;
    favoriteListId?: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: number;
    userName!: string;
    password!: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin?: boolean;
    gender?: string;
    phone?: string;
    street?: string;
    zip?: string;
    city?: string;
    country?: string;
    wallet!: number;
    favoriteListId?: number;

    public static initialize(sequelize: Sequelize) {
        User.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Please enter a username'
                    }
                },
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                // validate: {
                //     is: [
                //         '/[A-Z]+/g',
                //         '/[a-z]+/g',
                //         '/[0-9]+/g',
                //         '/[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]+/'
                //     ]
                // }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Please enter an email'
                    },
                    isEmail: {
                        msg: 'Please use valid format (e.g. team8@ese20.ch)',
                    }
                },
                unique: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            gender: {
                type: DataTypes.STRING
            },
            phone: {
                type: DataTypes.STRING
            },
            zip: {
                type: DataTypes.STRING
            },
            street: {
                type: DataTypes.STRING
            },
            city: {
                type: DataTypes.STRING
            },
            country: {
                type: DataTypes.STRING
            },
            wallet: {
                type: DataTypes.DECIMAL(19, 2),
                defaultValue: 500, // each user gets seed capital of 500
                validate: {
                    min: 0
                }
            }
        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }

    public static createAssociations() {
        User.hasMany(Product);
    }
}
