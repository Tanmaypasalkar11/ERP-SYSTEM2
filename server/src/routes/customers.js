import { Router } from "express";
import { createCustomer, listCustomers } from "../controllers/customersController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { customerSchema } from "../validators/customer.js";

const router = Router();

router.get("/", requireAuth, requireRole(["ADMIN", "SALES_MANAGER"]), listCustomers);
router.post("/", requireAuth, requireRole(["ADMIN", "SALES_MANAGER"]), validate(customerSchema), createCustomer);

export default router;
