import Delivery from "../models/delivery.js";

class DeliveryRepository {
  async getAll() {
    return await Delivery.find({})
      .populate("order")
      .populate("driver")
      .select("-__v");
  }

  async create(deliveryData) {
    return await Delivery.create(deliveryData);
  }
}

export default new DeliveryRepository();