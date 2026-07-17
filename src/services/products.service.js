import ProductRepository from "../repositories/products.repository.js";

class ProductService {
  async getAllProducts() {
    return await ProductRepository.getAll();
  }

  async getProductById(id) {
    const product = await ProductRepository.getById(id);

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    return product;
  }

  async createProduct(productData) {
    return await ProductRepository.create(productData);
  }

  async updateProduct(id, productData) {
    const product = await ProductRepository.update(id, productData);

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    return product;
  }

  async deleteProduct(id) {
    const product = await ProductRepository.delete(id);

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    return product;
  }
}

export default new ProductService();