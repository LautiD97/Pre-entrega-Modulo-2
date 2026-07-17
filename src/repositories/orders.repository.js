import Order from "../models/order.js";

class OrderRepository {
  async getAll() {
    return await Order.find({})
      .populate("user")
      .select("-__v");
  }

  async create(orderData) {
    return await Order.create(orderData);
  }
}

export default new OrderRepository();