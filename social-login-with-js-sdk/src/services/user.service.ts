import { userRepository } from '../repositories/user.repository';
import { authService } from './auth.service';
import type { User } from '../types/user';

export const userService = {
  /**
   * 현재 로그인 유저 정보 조회.
   * 백엔드가 설정된 경우 서버 API 호출, 아닌 경우 소셜 SDK에서 가져온 정보 반환.
   */
  async getMe(): Promise<User> {
    if (import.meta.env.VITE_API_BASE_URL) {
      return userRepository.getMe();
    }

    const socialUser = authService.getSocialUser();
    if (socialUser) return socialUser;

    throw new Error('사용자 정보를 찾을 수 없습니다.');
  },
};
