"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const auth_2 = require("../middlewares/validators/auth");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", auth_2.signupValidators, auth_1.signup);
authRoutes.post("/login", auth_2.signInValidators, auth_1.login);
authRoutes.get("/renew", validate_jwt_1.validateJWT, auth_1.renew);
exports.default = authRoutes;
//# sourceMappingURL=auth.js.map