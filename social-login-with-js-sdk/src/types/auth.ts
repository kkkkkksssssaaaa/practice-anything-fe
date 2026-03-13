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

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  provider: SocialProviderType;
  accessToken?: string;
  idToken?: string;
  authorizationCode?: string;
  redirectUri?: string;
}

export interface LoginResponse {
  token: AuthToken;
  isNewUser: boolean;
}
