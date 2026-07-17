import Driver from "../models/driver.js";

class DriverRepository {
  async getAll() {
    return await Driver.find({}, "-__v");
  }

  async create(driverData) {
    return await Driver.create(driverData);
  }
}

export default new DriverRepository();