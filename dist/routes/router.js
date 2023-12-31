"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const events_1 = __importDefault(require("./events"));
const router = (0, express_1.Router)();
router.use("/api/events", events_1.default);
router.use("/api/auth", auth_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map