import { Router } from "express";

import authRoutes from "./auth";
import eventRoutes from "./events";

const router = Router();

router.use("/api/events", eventRoutes);
router.use("/api/auth", authRoutes);

export default router;
