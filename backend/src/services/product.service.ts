import { ProductAttributes, Product, ProductCreationAttributes } from '../models/product.model';

export class ProductService {
  public async get(productId: string) {
    return Product.findOne({
      where: {
        productId: productId,
      },
    });
  }

  public async create(product: ProductCreationAttributes) {
    delete product.status;
    return Product.create(product);
  }

  public async approve(productId: string): Promise<Product> {
    const product = await Product.findByPk(productId);
    product.status = 'approved';
    return product.save();
  }

  public async delete(productId: string) {
    const product = await Product.findByPk(productId);
    product.status = 'deleted';
    return product.destroy();
  }

  public async getAll() {
    return Product.findAll({
      where: {
        status: 'approved',
      },
    });
  }

  public async getToBeApproved() {
    return Product.findAll({
      where: {
        status: 'pending',
      },
    });
  }
}
