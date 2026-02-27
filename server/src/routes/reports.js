import { Router } from "express";
import { ordersReport, inventoryReport, productionReport } from "../controllers/reportsController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();

router.get("/orders", requireAuth, requireRole(["ADMIN", "PURCHASE_MANAGER", "PRODUCTION_MANAGER", "SALES_MANAGER"]), ordersReport);
router.get("/inventory", requireAuth, requireRole(["ADMIN", "PURCHASE_MANAGER", "PRODUCTION_MANAGER", "SALES_MANAGER"]), inventoryReport);
router.get("/production", requireAuth, requireRole(["ADMIN", "PURCHASE_MANAGER", "PRODUCTION_MANAGER", "SALES_MANAGER"]), productionReport);

export default router;
