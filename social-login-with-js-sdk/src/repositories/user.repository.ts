/**
 * /api/users/* 엔드포인트 API 호출 정의
 */
import { httpClient } from '../lib/httpClient';
import type { User } from '../types/user';

export const userRepository = {
  /**
   * 내 프로필 조회
   * GET /api/users/me
   */
  getMe: () => httpClient<User>('/api/users/me'),

  /**
   * 내 프로필 수정
   * PATCH /api/users/me
   */
  updateMe: (body: Partial<Pick<User, 'nickname' | 'profileImageUrl'>>) =>
    httpClient<User>('/api/users/me', {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
};
