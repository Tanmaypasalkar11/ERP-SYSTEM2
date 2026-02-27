import { Router } from "express";
import { createPurchaseOrder, inwardPurchaseOrder, listPurchaseOrders } from "../controllers/purchaseOrdersController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { purchaseOrderSchema } from "../validators/purchaseOrder.js";

const router = Router();

router.get("/", requireAuth, requireRole(["ADMIN", "PURCHASE_MANAGER"]), listPurchaseOrders);
router.post("/", requireAuth, requireRole(["ADMIN", "PURCHASE_MANAGER"]), validate(purchaseOrderSchema), createPurchaseOrder);
router.post(
  "/:id/inward",
  requireAuth,
  requireRole(["ADMIN", "PURCHASE_MANAGER"]),
  inwardPurchaseOrder
);

export default router;
