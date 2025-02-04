export class BaseResponse<T = any> {
  message?: string;
  data?: T;
}
