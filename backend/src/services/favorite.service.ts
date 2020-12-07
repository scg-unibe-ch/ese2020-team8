import { Favorite } from '../models/favorite.model';
import { Product } from '../models/product.model';
import {Photo} from '../models/photo.model';

export class FavoriteService {
  public async get(favoriteId: string) {
    return Favorite.findOne({
      where: {
        id: favoriteId,
      },
    });
  }

  public async create(userId: number, productId: number) {
    return Favorite.create({ UserId: userId, ProductId: productId });
  }

  public async delete(favoriteId: string) {
    return Favorite.destroy({
      where: {
        id: favoriteId,
      },
    });
  }

  public async getMyFavorites(userId: number) {
    return Favorite.findAll({
      where: {
        UserId: userId,
      },
      include: {
        model: Product as any,
        include: Photo as any
      },
    });
  }
}

export const favoriteService = new FavoriteService();
