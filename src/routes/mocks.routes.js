import { Router } from "express";
import MocksController from "../controllers/mocks.controller.js";

const router = Router();

router.get("/", MocksController.generateMocks);
router.post("/seed", MocksController.seedMocks);

export default router;