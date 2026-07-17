import User from "../models/user.js";
import { ROLES } from "../constants/index.js";

class UserRepository {
  async getAll() {
    return await User.find(
      { role: { $in: [ROLES.ADMIN, ROLES.USER] } },
      "-__v"
    );
  }

  async getById(id) {
    return await User.findById(id);
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, userData) {
    return await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserRepository();