import { faker } from "@faker-js/faker";
import {
  ROLES,
  ORDER_STATUS,
  DELIVERY_STATUS,
  PRIORITIES,
} from "../constants/index.js";

export const generateMockUser = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: ROLES.USER,
});

export const generateMockDriver = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: ROLES.DRIVER,
});

export const generateMockOrder = (userId) => ({
  user: userId,
  status: faker.helpers.arrayElement(Object.values(ORDER_STATUS)),
  priority: faker.helpers.arrayElement(Object.values(PRIORITIES)),
});

export const generateMockDelivery = (orderId, driverId) => ({
  order: orderId,
  driver: driverId,
  status: faker.helpers.arrayElement(Object.values(DELIVERY_STATUS)),
});