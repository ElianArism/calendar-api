export interface ApiResponse<T> {
  ok: boolean;
  error: {
    message: string;
    logs: any;
  } | null;
  data: T | null;
}
