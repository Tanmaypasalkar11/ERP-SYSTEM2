import { Router } from "express";
import { createProduct, listProducts } from "../controllers/productsController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { productSchema } from "../validators/product.js";

const router = Router();

router.get("/", requireAuth, requireRole(["ADMIN", "PURCHASE_MANAGER", "PRODUCTION_MANAGER", "SALES_MANAGER"]), listProducts);
router.post(
  "/",
  requireAuth,
  requireRole(["ADMIN", "PURCHASE_MANAGER", "PRODUCTION_MANAGER"]),
  validate(productSchema),
  createProduct
);

export default router;
