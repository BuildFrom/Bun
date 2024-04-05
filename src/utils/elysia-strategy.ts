import { Context } from "elysia";

export type HttpResponse<T = any> = {
  statusCode: number;
  data: T;
};

export function extendRoute(func: (httpRequest: any) => Promise<HttpResponse>) {
  return async (context: Context) => {
    const { statusCode, data } = await func(context.body ?? {});
    context.set.status = statusCode;
    return data;
  };
}
