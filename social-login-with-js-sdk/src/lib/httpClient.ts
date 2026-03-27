const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 동시에 여러 401이 발생해도 refresh는 한 번만 호출되도록 promise를 공유
let refreshPromise: Promise<void> | null = null;

const refreshAccessToken = async (): Promise<void> => {
  const res = await fetch(`${BASE_URL}/app/v1/auth/token/refresh`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'Token refresh failed');
  }

  const data = await res.json() as { accessToken: string };
  localStorage.setItem('accessToken', data.accessToken);
};

const buildFetchOptions = (options?: RequestInit): RequestInit => ({
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...(options?.headers as Record<string, string>),
  },
  ...options,
});

const parseResponse = async <T>(res: Response): Promise<T> => {
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
};

export const httpClient = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${path}`, buildFetchOptions(options));

  // refresh 엔드포인트 자체의 401은 무한 루프 방지를 위해 그냥 에러로 처리
  if (res.status === 401 && BASE_URL && !path.includes('/auth/token/refresh')) {
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    try {
      await refreshPromise;
    } catch {
      // refresh 실패 → 세션 만료, 로그인 페이지로 이동
      localStorage.removeItem('accessToken');
      window.location.href = '/';
      throw new ApiError(401, '세션이 만료되었습니다. 다시 로그인해 주세요.');
    }

    // 갱신된 토큰으로 원래 요청 재시도
    const retryRes = await fetch(`${BASE_URL}${path}`, buildFetchOptions(options));

    if (!retryRes.ok) {
      const error = await retryRes.json().catch(() => ({ message: retryRes.statusText }));
      throw new ApiError(retryRes.status, (error as { message?: string }).message ?? '요청 실패');
    }

    return parseResponse<T>(retryRes);
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new ApiError(res.status, (error as { message?: string }).message ?? '요청 실패');
  }

  return parseResponse<T>(res);
}
