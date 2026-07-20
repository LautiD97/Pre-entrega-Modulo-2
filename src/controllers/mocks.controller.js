import MocksService from "../services/mocks.service.js";

class MocksController {
  generateMocks = (req, res, next) => {
    try {
      const data = MocksService.generateMocks(req.body);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  seedMocks = async (req, res, next) => {
    try {
      const result = await MocksService.seedMocks(req.body);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default new MocksController();