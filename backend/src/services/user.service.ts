import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Op} from 'sequelize';
import {IUserToken} from '../middlewares/checkAuth';

export class UserService {
  public register(user: UserAttributes): Promise<UserAttributes> {
    const saltRounds = 12;
    user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
    return User.create(user);
  }

  public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
    const secret = process.env.JWT_SECRET;
    return User.findOne({
      where: {
        [Op.or]: [
          { userName: loginRequestee.userName },
          { email: loginRequestee.userName },
        ],
      },
    })
      .then((user) => {
        if (bcrypt.compareSync(loginRequestee.password, user.password)) {
          // compares the hash with the password from the lognin request
          const token: string = jwt.sign(
            { userName: user.userName, userId: user.id, isAdmin: user.isAdmin },
            secret,
            { expiresIn: '2h' }
          );
          return Promise.resolve({ user, token });
        } else {
          return Promise.reject({ message: 'not authorized' });
        }
      })
      .catch((err) => Promise.reject({ message: err }));
  }

  public getAll(): Promise<User[]> {
    return User.findAll();
  }

  public getUserFromToken(token: IUserToken): Promise<User> {
    return User.findOne({
      where: {
        id: token.userId,
      },
    });
  }

  public get(userId: number): Promise<User> {
    return User.findOne({
      where: {
        id: userId,
      },
    });
  }

  public async update(userId: number, userChanges: UserAttributes) {
    delete userChanges.id; // id should not be changed!

    return User.update(userChanges, {
      where: {
        id: userId,
      },
    });
  }
}

export const userService = new UserService();
