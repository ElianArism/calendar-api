export const enum ApiErrorMessages {
  userAlreadyExists = "User already exists",
  internalServerError = "Internal server error",
  userNotExists = "User not exists with this email / password",
  incorrectPassword = "Incorrect password",
  tokenNotGenerated = "Error generating JWT",
  missingToken = "Token not founded in request",
  invalidToken = "Invalid token",
  paramIdIsRequired = "Param id is required",
  userUnauthorized = "The user does not have sufficient permissions to perform this action",
  unknown = "UnknownError",
}

export const enum EventErrorMessages {
  eventNotFound = "Event not found",
}
