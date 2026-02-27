import { Router } from "express";
import { createVendor, listVendors } from "../controllers/vendorsController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { vendorSchema } from "../validators/vendor.js";

const router = Router();

router.get("/", requireAuth, requireRole(["ADMIN", "PURCHASE_MANAGER"]), listVendors);
router.post("/", requireAuth, requireRole(["ADMIN", "PURCHASE_MANAGER"]), validate(vendorSchema), createVendor);

export default router;
