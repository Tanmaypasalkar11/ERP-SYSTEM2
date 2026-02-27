import { Router } from "express";
import { listInventory } from "../controllers/inventoryController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();

router.get("/", requireAuth, requireRole(["ADMIN", "PURCHASE_MANAGER", "PRODUCTION_MANAGER", "SALES_MANAGER"]), listInventory);

export default router;
