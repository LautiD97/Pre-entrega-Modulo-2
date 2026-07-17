import MocksRepository from "../repositories/mocks.repository.js";
import {
  generateMockUser,
  generateMockDriver,
  generateMockOrder,
  generateMockDelivery,
} from "../utils/mockGenerator.js";

class MocksService {
  generateMocks() {
    const users = Array.from({ length: 5 }, () => generateMockUser());
    const drivers = Array.from({ length: 3 }, () => generateMockDriver());

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
  }

  async seedMocks() {
    const users = Array.from({ length: 5 }, () => generateMockUser());
    const drivers = Array.from({ length: 3 }, () => generateMockDriver());

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
      deliveries.map((delivery) => MocksRepository.createDelivery(delivery))
    );

    return {
      users: createdUsers.length,
      drivers: createdDrivers.length,
      orders: createdOrders.length,
      deliveries: createdDeliveries.length,
    };
  }
}

export default new MocksService();