import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiErrorMessages } from "../enums/api-error-messages";

export const GenerateJWT = (
  uid: string,
  username: string
): Promise<{
  error?: { message: ApiErrorMessages; logs: any };
  jwt: string;
}> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { uid, username },
      process.env.SECRET_JWT_SEED as string,
      { expiresIn: "2h" },
      (error, token) => {
        if (error) {
          reject({
            message: ApiErrorMessages.tokenNotGenerated,
            logs: error,
          });
        }
        resolve({ jwt: token as string });
      }
    );
  });
};

export const ValidateJsonWebToken = (token: string) => {
  const payload: JwtPayload = <JwtPayload>(
    jwt.verify(token, <string>process.env.SECRET_JWT_SEED)
  );

  return {
    uid: payload.uid,
    username: payload.username,
  };
};
