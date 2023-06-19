import { NextFunction, Request, Response } from "express";
import { ApiErrorMessages } from "../enums/api-error-messages";
import { ValidateJsonWebToken } from "../utils/jwt";
import { GenerateErrorResponse } from "../utils/response-generation";

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    return res
      .status(401)
      .json(GenerateErrorResponse(ApiErrorMessages.missingToken));
  }

  try {
    const { uid, username } = ValidateJsonWebToken(token);
    req._id = uid;
    req.username = username;
  } catch (error) {
    return res
      .status(401)
      .json(GenerateErrorResponse(ApiErrorMessages.invalidToken));
  }

  next();
};
