"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_1 = require("../controllers/events");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const eventRoutes = (0, express_1.Router)();
eventRoutes.get("/", validate_jwt_1.validateJWT, events_1.getEvents);
eventRoutes.get("/:id", validate_jwt_1.validateJWT, events_1.getEventById);
eventRoutes.post("/", validate_jwt_1.validateJWT, events_1.createEvent);
eventRoutes.put("/:id", validate_jwt_1.validateJWT, events_1.updateEvent);
eventRoutes.delete("/:id", validate_jwt_1.validateJWT, events_1.removeEvent);
exports.default = eventRoutes;
//# sourceMappingURL=events.js.map