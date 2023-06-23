import { CustomValidator, Meta } from "express-validator";

export const isDate: CustomValidator = (
  value: string,
  { req, location, path }: Meta
) => {
  if (!value.trim()) return false;

  const timestamp = Date.parse(value);
  return !isNaN(timestamp);
};
