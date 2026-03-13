import type { SocialLoginResult, SocialProviderType } from '../types/auth';

/**
 * 소셜 로그인 프로바이더 추상 인터페이스.
 * Kakao, Apple, Naver 등 각 플랫폼이 이 인터페이스를 구현한다.
 */
export interface ISocialProvider {
  readonly providerType: SocialProviderType;

  /** 로그인 실행 → 소셜 토큰 + 유저 정보 반환 */
  login(): Promise<SocialLoginResult>;

  /** 소셜 SDK 세션 로그아웃 */
  logout(): Promise<void>;
}
