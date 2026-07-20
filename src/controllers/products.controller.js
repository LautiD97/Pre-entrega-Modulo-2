import ProductService from "../services/products.service.js";

class ProductController {
  async getAll(req, res, next) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newProduct = await ProductService.createProduct(req.body);

      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedProduct = await ProductService.updateProduct(
        id,
        req.body
      );

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await ProductService.deleteProduct(id);

      res.status(200).json({
        message: "Producto eliminado correctamente",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();