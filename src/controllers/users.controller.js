import UserService from "../services/users.service.js";

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.updateUser(id, req.body);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await UserService.deleteUser(id);

      res.status(200).json({
        message: "Usuario eliminado correctamente",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();