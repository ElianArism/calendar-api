import { Router } from "express";
import {
  createEvent,
  getEventById,
  removeEvent,
  updateEvent,
} from "../controllers/events";
import { validateJWT } from "../middlewares/validate-jwt";

const eventRoutes = Router();

eventRoutes.get("/", validateJWT, removeEvent);
eventRoutes.get("/:id", validateJWT, getEventById);
eventRoutes.post("/", validateJWT, createEvent);
eventRoutes.put("/", validateJWT, updateEvent);
eventRoutes.delete("/", validateJWT, removeEvent);

export default eventRoutes;
