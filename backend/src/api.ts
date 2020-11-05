
import { Request, Response, Router } from 'express';
import {UserController} from './controllers/user.controller';
import {SecuredController} from './controllers/secured.controller';
import {ProductController} from './controllers/products.controller';
import {PhotoController} from './controllers/photo.controller';

export const ApiController = Router();

ApiController
  .get('/', (_req: Request, res: Response) => res.json({version: '2.0'}))
  .use('/products', ProductController)
  .use('/images', PhotoController)
  .use('/user', UserController)
  .use('/secured', SecuredController)
;

