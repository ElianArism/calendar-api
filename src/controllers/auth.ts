import { Request, Response } from "express";
import User from "../db/models/User";
import { IUser } from "../interfaces/User";

export const signup = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const user = new User({
      email,
      password,
      username,
    });

    const userExists: IUser | null = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return res.status(400).json({
        ok: false,
        data: null,
        errors: [
          {
            message: "DB Insertion Error",
            logs: `User with this ${
              email === userExists.email
                ? `email: "${email}"`
                : `username: "${username}"`
            } already exists`,
          },
        ],
      });
    }

    await user.save();

    return res.json({
      ok: true,
      data: { _id: user._id, username: user.username },
      errors: null,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      data: null,
      errors: [
        {
          message: "DB Insertion Error",
          logs: error,
        },
      ],
    });
  }
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
