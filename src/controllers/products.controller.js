import ProductService from "../services/products.service.js";

class ProductController {
  async getAll(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);

      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const newProduct = await ProductService.createProduct(req.body);

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const updatedProduct = await ProductService.updateProduct(
        id,
        req.body
      );

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      await ProductService.deleteProduct(id);

      res.status(200).json({
        message: "Producto eliminado correctamente",
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new ProductController();