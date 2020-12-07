import express, { Router, Response, NextFunction } from 'express';
import { IAuthRequest } from '../middlewares/checkAuth';
import { FavoriteService } from '../services/favorite.service';

const favoriteController: Router = express.Router();
const favoriteService = new FavoriteService();

favoriteController.delete(
  '/:favoriteId',
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const favorites = await favoriteService.delete(req.params.favoriteId);
      res.send({ deleted: favorites });
    } catch (err) {
      next(err);
    }
  }
);


favoriteController.get(
  '/',
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const favorites = await favoriteService.getMyFavorites(req.user.userId);
      res.send(favorites);
    } catch (err) {
      next(err);
    }
  }
);

export const FavoriteController: Router = favoriteController;
