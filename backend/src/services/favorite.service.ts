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

  public async create(favorite: FavoriteAttributes) {
    return Favorite.create(favorite);
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
