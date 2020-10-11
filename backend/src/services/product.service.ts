import { ProductAttributes, Product, ProductCreationAttributes } from '../models/product.model';

export class ProductService {
  public get(productId: string): Promise<ProductAttributes> {
    return Product.findOne({
      where: {
        productId: productId,
      },
    })
      .then((product) => Promise.resolve(product))
      .catch((err) => Promise.reject(err));
  }

  public create(product: ProductCreationAttributes): Promise<ProductAttributes> {
    return Product.create(product)
      .then((inserted) => Promise.resolve(inserted))
      .catch((err) => Promise.reject(err));
  }

  public getAll(): Promise<Product[]> {
    return Product.findAll({
      where: {
        approved: true,
      },
    });
  }
  public getToBeApproved(): Promise<Product[]> {
    return Product.findAll({
      where: {
        approved: false,
      },
    });
  }
}
