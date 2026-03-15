/**
 * /app/v1/users/* 엔드포인트 API 호출 정의
 */
import { httpClient } from '../lib/httpClient';
import type { User } from '../types/user';

export const userRepository = {
  /**
   * 내 프로필 조회
   * GET /app/v1/users/me
   */
  getMe: () => httpClient<User>('/app/v1/users/me'),

  /**
   * 내 프로필 수정
   * PATCH /app/v1/users/me
   */
  updateMe: (body: Partial<Pick<User, 'nickname' | 'profileImageUrl'>>) =>
    httpClient<User>('/app/v1/me', {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
};
