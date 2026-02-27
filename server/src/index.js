import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.js";
import customerRoutes from "./routes/customers.js";
import vendorRoutes from "./routes/vendors.js";
import productRoutes from "./routes/products.js";
import inventoryRoutes from "./routes/inventory.js";
import purchaseOrderRoutes from "./routes/purchaseOrders.js";
import productionRoutes from "./routes/production.js";
import customerOrderRoutes from "./routes/customerOrders.js";
import reportRoutes from "./routes/reports.js";

const app = express();
app.disable("x-powered-by");

const allowedOrigins = env.corsOrigin
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    }
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(helmet());
app.use(compression());
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/production", productionRoutes);
app.use("/api/customer-orders", customerOrderRoutes);
app.use("/api/reports", reportRoutes);

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server listening on port ${env.port}`);
});
