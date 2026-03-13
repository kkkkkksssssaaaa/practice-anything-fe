/**
 * /api/auth/* 엔드포인트 API 호출 정의
 */
import { httpClient } from '../lib/httpClient';
import type { LoginRequest, LoginResponse } from '../types/auth';

export const authRepository = {
  /**
   * 소셜 토큰으로 서버 로그인 (서버에서 앱 토큰 발급)
   * POST /api/auth/login
   */
  login: (body: LoginRequest) =>
    httpClient<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  /**
   * 서버 세션 로그아웃
   * POST /api/auth/logout
   */
  logout: () =>
    httpClient<void>('/api/auth/logout', { method: 'POST' }),

  /**
   * 액세스 토큰 갱신
   * POST /api/auth/refresh
   */
  refresh: (refreshToken: string) =>
    httpClient<{ accessToken: string }>('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }),
};
