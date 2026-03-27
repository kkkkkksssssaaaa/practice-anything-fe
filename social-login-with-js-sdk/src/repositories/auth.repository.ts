/**
 * /api/auth/* 엔드포인트 API 호출 정의
 */
import { httpClient } from '../lib/httpClient';
import type { AuthTokenResponse, LoginRequest, SignupRequest, SocialProviderType } from '../types/auth';

export const authRepository = {
  /**
   * 소셜 토큰으로 서버 로그인
   * POST /app/v1/auth/{platform}/login
   */
  login: (provider: SocialProviderType, body: LoginRequest) =>
    httpClient<AuthTokenResponse>(`/app/v1/auth/${provider}/login`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  /**
   * 소셜 회원가입 (로그인 404 시 호출)
   * POST /app/v1/auth/{platform}/signup
   */
  signup: (provider: SocialProviderType, body: SignupRequest) =>
    httpClient<AuthTokenResponse>(`/app/v1/auth/${provider}/signup`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  /**
   * 서버 세션 로그아웃
   * POST /app/v1/auth/logout
   */
  logout: () =>
    httpClient<void>(buildLogoutApi(), { method: 'POST' }),

  /**
   * 회원 탈퇴 (User/Account/Child soft delete)
   * DELETE /app/v1/auth/{platform}/withdraw
   */
  withdraw: (provider: SocialProviderType) =>
    httpClient<void>(`/app/v1/auth/${provider}/withdraw`, { method: 'DELETE' }),

  /**
   * 액세스 토큰 갱신 (refreshToken은 쿠키로 자동 전송)
   * POST /app/v1/auth/token/refresh
   */
  refresh: () =>
    httpClient<AuthTokenResponse>(`/app/v1/auth/token/refresh`, {
      method: 'POST',
    }),
};

const buildLogoutApi = () => `/app/v1/auth/logout`;
