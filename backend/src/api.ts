
import { Request, Response, Router } from 'express';
import {TodoItemController} from './controllers/todos.controller';
import {UserController} from './controllers/user.controller';
import {SecuredController} from './controllers/secured.controller';
import {verifyToken} from './middlewares/checkAuth';
import {TodoListController} from './controllers/todolist.controller';

export const ApiController = Router();

ApiController
  .get('/', (req: Request, res: Response) => res.json({version: '1.0'}))
  .use('/todoitem', TodoItemController)
  .use('/todolist', TodoListController)
  .use('/user', UserController)
  .use('/secured', SecuredController)
;

