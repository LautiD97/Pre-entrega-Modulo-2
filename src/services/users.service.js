import UserRepository from "../repositories/users.repository.js";

class UserService {
  async getAllUsers() {
    return await UserRepository.getAll();
  }

  async getUserById(id) {
    const user = await UserRepository.getById(id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  }

  async createUser(userData) {
    return await UserRepository.create(userData);
  }

  async updateUser(id, userData) {
    const user = await UserRepository.update(id, userData);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  }

  async deleteUser(id) {
    const user = await UserRepository.delete(id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  }
}

export default new UserService();