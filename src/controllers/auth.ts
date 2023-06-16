import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const signup = (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  const errors = validationResult(req);
  if (errors.array().length) {
    return res.status(400).json({
      ok: false,
      msg: "Bad request",
      errors: errors.array(),
    });
  }

  return res.json({
    ok: true,
    msg: "Hello World BREO",
  });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  return res.json({
    ok: true,
    msg: "Hello World BREO",
  });
};

export const renew = (req: Request, res: Response) => {
  return res.json({
    ok: true,
    msg: "Hello World BREO",
  });
};
