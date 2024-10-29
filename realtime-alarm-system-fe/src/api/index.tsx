import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { QueryParams } from "./types/queryParams";
import { Headers } from "./types/header";
import { QueryClient, QueryClientProvider } from "react-query";
import { createContext, ReactNode, useContext } from "react";

export type RequestMetadata = {
  path: string;
  headers?: Headers;
  queryParams?: QueryParams;
  bodyParams?: any;
};

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_HOST,
  responseType: "json" as const,
  timeout: 10 * 10000,
  withCredentials: true,
});

let isRefreshing = false; // 갱신 중인지 여부

let failedQueue: Array<{
  requestConfig: AxiosRequestConfig;
  resolve: (value: AxiosResponse) => any;
  reject: (reason: AxiosError) => any;
}> = []; // 실패 큐

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach(async ({ requestConfig, resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      // 갱신된 토큰으로 Authorization 헤더를 설정하고 요청 재시도
      requestConfig.headers = {
        ...requestConfig.headers,
        Authorization: `Bearer ${token}`,
      };
      resolve(await instance(requestConfig));
    }
  });
  failedQueue = [];
};

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // originalRequest가 존재하지 않으면 오류를 바로 반환
    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (!Object.hasOwn(originalRequest, "_retry")) {
      (originalRequest as any)._retry = false;
    }

    if (error.response?.status === 403 && !(originalRequest as any)._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ requestConfig: originalRequest, resolve, reject });
        });
      }

      isRefreshing = true;
      (originalRequest as any)._retry = true;
      localStorage.removeItem("accessToken");

      api
        .post({
          path: `/auth/token/refresh`,
          headers: Headers.default(),
        })
        .then((res: AxiosResponse) => {
          const accessToken = res.data.accessToken;
          localStorage.setItem("accessToken", accessToken);

          originalRequest.headers["Authorization"] = "Bearer " + accessToken;
          processQueue(null, accessToken);
          return instance(originalRequest); // 토큰 갱신 후 원래 요청 재시도
        })
        .catch((err: AxiosError) => {
          processQueue(err, null);
          return Promise.reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    return Promise.reject(error);
  },
);

const queryClient = new QueryClient();

type ApiContextType = {
  api: typeof api;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => (
  <ApiContext.Provider value={{ api }}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ApiContext.Provider>
);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error("useApi must be used within an ApiProvider");
  return context.api;
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
