import { Router } from "express";
import { login, renew, signup } from "../controllers/auth";
import { validateJWT } from "../middlewares/validate-jwt";
import {
  signInValidators,
  signupValidators,
} from "../middlewares/validators/auth";

const authRoutes = Router();

authRoutes.post("/signup", signupValidators, signup);
authRoutes.post("/login", signInValidators, login);
authRoutes.get("/renew", validateJWT, renew);

export default authRoutes;
