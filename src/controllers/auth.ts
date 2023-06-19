import { Request, Response } from "express";

export const signup = (req: Request, res: Response) => {
  const { email, password, username } = req.body;

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
