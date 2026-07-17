import UserService from "../services/users.service.js";

class UserController {
  async getAll(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.getUserById(id);

      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);

      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.updateUser(id, req.body);

      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      await UserService.deleteUser(id);

      res.status(200).json({
        message: "Usuario eliminado correctamente",
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new UserController();