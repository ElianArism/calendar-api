import { Router } from "express";

import authRoutes from "./auth";
import eventRoutes from "./events";

const router = Router();

router.use("/api", authRoutes);
router.use("/api/events", eventRoutes);

export default router;
