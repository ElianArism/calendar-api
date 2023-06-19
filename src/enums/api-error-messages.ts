export const enum ApiErrorMessages {
  userAlreadyExists = "User already exists",
  internalServerError = "Internal server error",
  userNotExists = "User not exists with this email / password",
  incorrectPassword = "Incorrect password",
  tokenNotGenerated = "Error generating JWT",
  missingToken = "Token not founded in request",
  invalidToken = "Invalid token",
  unknown = "UnknownError",
}
