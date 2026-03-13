import { getSocialProvider } from '../providers';
import { authRepository } from '../repositories/auth.repository';
import type { SocialProviderType } from '../types/auth';
import type { User } from '../types/user';

const STORAGE_KEYS = {
  provider: 'provider',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  socialUser: 'socialUser',
} as const;

export const authService = {
  /**
   * 소셜 SDK로 로그인 후 서버 토큰 발급까지 처리.
   * VITE_API_BASE_URL 미설정 시 소셜 SDK 토큰만 저장 (백엔드 없이 테스트 가능).
   */
  async loginWithSocial(provider: SocialProviderType): Promise<void> {
    const socialProvider = getSocialProvider(provider);

    const result = await socialProvider.login();

    // 소셜 토큰과 유저 정보 저장
    localStorage.setItem(STORAGE_KEYS.provider, result.provider);
    localStorage.setItem(STORAGE_KEYS.accessToken, result.accessToken);
    if (result.user) {
      localStorage.setItem(
        STORAGE_KEYS.socialUser,
        JSON.stringify(result.user),
      );
    }

    // 백엔드가 설정된 경우 서버 토큰으로 교환
    if (import.meta.env.VITE_API_BASE_URL) {
      const response = await authRepository.login({
        provider: result.provider,
        accessToken: result.accessToken,
        authorizationCode: result.authorizationCode,
      });
      localStorage.setItem(STORAGE_KEYS.accessToken, response.token.accessToken);
      localStorage.setItem(STORAGE_KEYS.refreshToken, response.token.refreshToken);
    }
  },

  async logout(): Promise<void> {
    const providerType = localStorage.getItem(
      STORAGE_KEYS.provider,
    ) as SocialProviderType | null;

    if (providerType) {
      try {
        const socialProvider = getSocialProvider(providerType);
        await socialProvider.logout();
      } catch (err) {
        console.warn('소셜 프로바이더 로그아웃 실패:', err);
      }
    }

    if (import.meta.env.VITE_API_BASE_URL) {
      try {
        await authRepository.logout();
      } catch (err) {
        console.warn('서버 로그아웃 실패:', err);
      }
    }

    Object.values(STORAGE_KEYS).forEach((key) =>
      localStorage.removeItem(key),
    );
  },

  isLoggedIn(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.accessToken);
  },

  getSocialUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEYS.socialUser);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  },
};
