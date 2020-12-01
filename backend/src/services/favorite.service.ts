import { Favorite, FavoriteAttributes } from '../models/favorite.model';
import { Product } from '../models/product.model';

export class FavoriteService {
  public async get(favoriteId: string) {
    return Favorite.findOne({
      where: {
        id: favoriteId,
      },
    });
  }

  public async create(userId: number, productId: number) {
    return Favorite.create({ userId, productId });
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
        userId: userId,
      },
      include: {
        model: Product as any,
      },
    });
  }
}

export const favoriteService = new FavoriteService();
