import { check } from "express-validator";
import { checkErrors } from "./check-errors";

export const signupValidators = [
  check("username", "Username is required").not().isEmpty(),
  check(
    "username",
    "Invalid username's length.\nMin: 2 - Max: 20."
  ).isLength({
    min: 2,
    max: 20,
  }),
  check("email", "Email is required").not().isEmpty(),
  check("email", "Email must be valid").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  checkErrors,
];

export const signInValidators = [
  check("email", "Email is required").not().isEmpty(),
  check("email", "Email must be valid").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  checkErrors,
];
