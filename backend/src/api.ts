
import { Request, Response, Router } from 'express';
import {TodoItemController} from './controllers/todos.controller';
import {UserController} from './controllers/user.controller';
import {SecuredController} from './controllers/secured.controller';
import {TodoListController} from './controllers/todolist.controller';
import {ProductController} from './controllers/products.controller';

export const ApiController = Router();

ApiController
  .get('/', (_req: Request, res: Response) => res.json({version: '2.0'}))
  .use('/todoitem', TodoItemController)
  .use('/todolist', TodoListController)
  .use('/products', ProductController)
  .use('/user', UserController)
  .use('/secured', SecuredController)
;

