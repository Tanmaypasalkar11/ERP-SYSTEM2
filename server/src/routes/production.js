import { Router } from "express";
import { createProduction } from "../controllers/productionController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { productionSchema } from "../validators/production.js";

const router = Router();

router.post("/", requireAuth, requireRole(["ADMIN", "PRODUCTION_MANAGER"]), validate(productionSchema), createProduction);

export default router;
