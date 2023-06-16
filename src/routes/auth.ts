import { Router } from "express";
import { login, renew, signup } from "../controllers/auth";
import { signupValidators } from "../middlewares/validators/auth";

const authRoutes = Router();

authRoutes.post("/signup", signupValidators, signup);
authRoutes.post("/login", [], login);
authRoutes.get("/renew", [], renew);

export default authRoutes;
