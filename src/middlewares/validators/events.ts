import { check } from "express-validator";
import { checkErrors } from "./check-errors";
import { isDate } from "./custom/is-date";

export const createEventvalidators: Function[] = [
  check("notes", "This field is required").not().isEmpty(),
  check("title", "This field is required").not().isEmpty(),
  check("start", "start date field is required").custom(isDate),
  check("end", "end date field is required").custom(isDate),
  check("user", "This field is required").not().isEmpty(),
  checkErrors,
];
