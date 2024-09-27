import axios, { AxiosInstance, AxiosResponse } from "axios";
import { QueryParams } from "./types/queryParams";
import { Headers } from "./types/header";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_HOST,
  responseType: "json" as const,
  timeout: 10 * 10000,
  withCredentials: true,
});

export type RequestMetadata = {
  path: string;
  headers?: Headers;
  queryParams?: QueryParams;
  bodyParams?: any;
};

export default class api {
  static get<T>(request: RequestMetadata): Promise<AxiosResponse<T>> {
    const header = request.headers ?? Headers.default();

    if (request.queryParams) {
      const queryString = request.queryParams
        .map((param) => `${param.key}=${param.value}`)
        .join("&");
      return instance.get(`${request.path}?${queryString}`, {
        headers: header.toAxiosHeader(),
      });
    }

    return instance.get(request.path, {
      headers: header.toAxiosHeader(),
    });
  }

  static post<T>(request: RequestMetadata): Promise<AxiosResponse<T>> {
    const header = request.headers ?? Headers.default();
    return instance.post(request.path, request.bodyParams, {
      headers: header.toAxiosHeader(),
    });
  }

  static put<T>(request: RequestMetadata): Promise<AxiosResponse<T>> {
    const header = request.headers ?? Headers.default();

    return instance.put(request.path, request.bodyParams, {
      headers: header.toAxiosHeader(),
    });
  }

  static patch<T>(request: RequestMetadata): Promise<AxiosResponse<T>> {
    const header = request.headers ?? Headers.default();

    return instance.patch(request.path, request.bodyParams, {
      headers: header.toAxiosHeader(),
    });
  }

  static delete<T>(request: RequestMetadata): Promise<AxiosResponse<T>> {
    const header = request.headers ?? Headers.default();

    return instance.delete(request.path, {
      headers: header.toAxiosHeader(),
    });
  }
}
