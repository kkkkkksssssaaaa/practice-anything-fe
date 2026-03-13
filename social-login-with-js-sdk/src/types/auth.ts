export type SocialProviderType = 'kakao' | 'apple' | 'naver';

export interface SocialLoginResult {
  provider: SocialProviderType;
  accessToken: string;
  idToken?: string;
  authorizationCode?: string;
  user?: SocialUser;
}

// 소셜 SDK에서 반환하는 유저 정보
export interface SocialUser {
  id: string;
  nickname?: string;
  profileImageUrl?: string;
  email?: string;
}

// POST /app/v1/auth/{platform}/login  body: SocialLoginRequest
export interface LoginRequest {
  accessToken: string;
}

// POST /app/v1/auth/{platform}/signup  body: SocialLogoutRequest (스펙상 명칭)
export interface SignupRequest {
  accessToken: string;
}

// AuthTokenResponse (login / signup 공통 응답)
export interface AuthTokenResponse {
  accessToken: string;
  isNewUser: boolean;
}
