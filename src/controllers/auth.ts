import { Request, Response } from "express";
import User from "../db/models/User";
import { ApiErrorMessages } from "../enums/api-error-messages";
import { IUser } from "../interfaces/User";
import {
  AreEncriptedStringsEquals,
  EncryptString,
} from "../utils/encryption";
import { GenerateJWT } from "../utils/jwt";
import {
  GenerateErrorResponse,
  GenerateSuccessResponse,
} from "../utils/response-generation";

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
      const logs = `There is another user with this ${
        email === userExists.email
          ? `email: "${email}"`
          : `username: "${username}"`
      }`;

      return res
        .status(400)
        .json(
          GenerateErrorResponse(
            ApiErrorMessages.userAlreadyExists,
            logs
          )
        );
    }

    user.password = EncryptString(user.password);

    await user.save();

    const result = await _GenerateJWTProcess(user, res);
    if (typeof result !== "string") return result;

    return res.json(
      GenerateSuccessResponse<Partial<IUser & { jwt: string }>>({
        username,
        _id: user._id,
        jwt: result,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        GenerateErrorResponse(
          ApiErrorMessages.internalServerError,
          error
        )
      );
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: IUser | null = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json(GenerateErrorResponse(ApiErrorMessages.userNotExists));
  }

  if (!AreEncriptedStringsEquals(password, user.password)) {
    return res
      .status(400)
      .json(
        GenerateErrorResponse(ApiErrorMessages.incorrectPassword)
      );
  }

  const result = await _GenerateJWTProcess(user, res);
  if (typeof result !== "string") return result;

  return res.json(
    GenerateSuccessResponse<Partial<IUser> & { token: string }>({
      token: result,
      username: user.username,
      _id: user._id,
    })
  );
};

export const renew = async (req: Request, res: Response) => {
  const { _id, username } = req;

  const result = await _GenerateJWTProcess({ _id, username }, res);
  if (typeof result !== "string") return result;

  return res.json(GenerateSuccessResponse(result));
};

async function _GenerateJWTProcess(
  user: { _id: string; username: string },
  res: Response
) {
  const { error, jwt } = await GenerateJWT(user._id, user.username);

  if (error) {
    return res
      .status(500)
      .json(GenerateErrorResponse(error.message, error.logs));
  }

  return jwt;
}
