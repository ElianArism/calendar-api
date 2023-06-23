import { Router } from "express";
import {
  createEvent,
  getEventById,
  getEvents,
  removeEvent,
  updateEvent,
} from "../controllers/events";
import { validateJWT } from "../middlewares/validate-jwt";

const eventRoutes = Router();

eventRoutes.get("/", validateJWT, getEvents);
eventRoutes.get("/:id", validateJWT, getEventById);
eventRoutes.post("/", validateJWT, createEvent);
eventRoutes.put("/:id", validateJWT, updateEvent);
eventRoutes.delete("/:id", validateJWT, removeEvent);

export default eventRoutes;
