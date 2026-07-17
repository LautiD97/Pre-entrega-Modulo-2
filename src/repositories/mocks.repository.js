import User from "../models/user.js";
import Driver from "../models/driver.js";
import Order from "../models/order.js";
import Delivery from "../models/delivery.js";

class MocksRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async createDriver(driverData) {
    return await Driver.create(driverData);
  }

  async createOrder(orderData) {
    return await Order.create(orderData);
  }

  async createDelivery(deliveryData) {
    return await Delivery.create(deliveryData);
  }
}

export default new MocksRepository();