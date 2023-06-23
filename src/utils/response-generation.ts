import { ApiErrorMessages } from "../enums/api-error-messages";
import { ApiResponse } from "../interfaces/api-response";

export const GenerateErrorResponse = <T>(
  message: ApiErrorMessages,
  logs?: any
): ApiResponse<T> => {
  return {
    data: null,
    error: {
      message,
      logs,
    },
    ok: false,
  };
};

export const GenerateSuccessResponse = <T>(
  data: T
): ApiResponse<T> => {
  return {
    data,
    error: null,
    ok: true,
  };
};
