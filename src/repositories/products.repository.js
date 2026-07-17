import Product from "../models/Product.js";
import { PRODUCT_STATUS } from "../constants/index.js";

class ProductRepository {
  async getAll() {
    return await Product.find(
      { status: PRODUCT_STATUS.AVAILABLE },
      "-__v"
    );
  }

  async getById(id) {
    return await Product.findById(id);
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async update(id, productData) {
    return await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductRepository();