import { Router } from "express";
import {
  createCustomerOrder,
  completeCustomerOrder,
  listCustomerOrders
} from "../controllers/customerOrdersController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { customerOrderSchema } from "../validators/customerOrder.js";

const router = Router();

router.get("/", requireAuth, requireRole(["ADMIN", "SALES_MANAGER"]), listCustomerOrders);
router.post("/", requireAuth, requireRole(["ADMIN", "SALES_MANAGER"]), validate(customerOrderSchema), createCustomerOrder);
router.post(
  "/:id/complete",
  requireAuth,
  requireRole(["ADMIN", "SALES_MANAGER"]),
  completeCustomerOrder
);

export default router;
