import { ApiErrorMessages } from "../enums/api-error-messages";

export interface ApiResponse<T> {
  ok: boolean;
  error: { message: ApiErrorMessages; logs: any } | null;
  data: T | null;
}
