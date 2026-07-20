import MocksRepository from "../repositories/mocks.repository.js";
import {
  generateMockUser,
  generateMockDriver,
  generateMockOrder,
  generateMockDelivery,
} from "../utils/mockGenerator.js";
import AppError from "../errors/AppError.js";
import ErrorCodes from "../errors/errorCodes.js";

class MocksService {
  validateQuantities(users, drivers) {
    const quantities = [users, drivers];

    const hasInvalidQuantity = quantities.some(
      (quantity) =>
        typeof quantity !== "number" ||
        !Number.isInteger(quantity) ||
        quantity <= 0
    );

    if (hasInvalidQuantity) {
      throw new AppError(ErrorCodes.INVALID_MOCK_QUANTITY);
    }
  }

  generateMocks(data = {}) {
    const {
      users: usersQuantity = 5,
      drivers: driversQuantity = 3,
    } = data;

    this.validateQuantities(usersQuantity, driversQuantity);

    try {
      const users = Array.from(
        { length: usersQuantity },
        () => generateMockUser()
      );

      const drivers = Array.from(
        { length: driversQuantity },
        () => generateMockDriver()
      );

      const orders = users.map((_, index) =>
        generateMockOrder(`user-${index + 1}`)
      );

      const deliveries = orders.map((_, index) =>
        generateMockDelivery(
          `order-${index + 1}`,
          `driver-${(index % drivers.length) + 1}`
        )
      );

      return {
        users,
        drivers,
        orders,
        deliveries,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(ErrorCodes.MOCK_GENERATION_ERROR);
    }
  }

  async seedMocks(data = {}) {
    const {
      users: usersQuantity = 5,
      drivers: driversQuantity = 3,
    } = data;

    this.validateQuantities(usersQuantity, driversQuantity);

    try {
      const users = Array.from(
        { length: usersQuantity },
        () => generateMockUser()
      );

      const drivers = Array.from(
        { length: driversQuantity },
        () => generateMockDriver()
      );

      const createdUsers = await Promise.all(
        users.map((user) => MocksRepository.createUser(user))
      );

      const createdDrivers = await Promise.all(
        drivers.map((driver) => MocksRepository.createDriver(driver))
      );

      const orders = createdUsers.map((user) =>
        generateMockOrder(user._id)
      );

      const createdOrders = await Promise.all(
        orders.map((order) => MocksRepository.createOrder(order))
      );

      const deliveries = createdOrders.map((order, index) =>
        generateMockDelivery(
          order._id,
          createdDrivers[index % createdDrivers.length]._id
        )
      );

      const createdDeliveries = await Promise.all(
        deliveries.map((delivery) =>
          MocksRepository.createDelivery(delivery)
        )
      );

      return {
        users: createdUsers.length,
        drivers: createdDrivers.length,
        orders: createdOrders.length,
        deliveries: createdDeliveries.length,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(ErrorCodes.MOCK_DATABASE_ERROR);
    }
  }
}

export default new MocksService();