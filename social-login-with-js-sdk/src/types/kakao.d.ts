// Kakao JavaScript SDK 타입 선언 (ambient declaration - 전역으로 사용 가능)
// 참고: https://developers.kakao.com/sdk/reference/js/release/Kakao.html

interface KakaoStatic {
  init(appKey: string): void;
  isInitialized(): boolean;
  Auth: KakaoAuth;
  API: KakaoAPI;
}

interface KakaoAuth {
  login(settings: KakaoAuthLoginSettings): void;
  authorize(settings: KakaoAuthAuthorizeSettings): void;
  logout(callback?: () => void): void;
  getAccessToken(): string | null;
  setAccessToken(token: string, persist?: boolean): void;
}

interface KakaoAuthLoginSettings {
  success?: (authObj: KakaoAuthObject) => void;
  fail?: (err: unknown) => void;
  always?: (authObj: KakaoAuthObject) => void;
  scope?: string;
  throughTalk?: boolean;
}

interface KakaoAuthAuthorizeSettings {
  redirectUri: string;
  scope?: string;
  state?: string;
  nonce?: string;
  throughTalk?: boolean;
}

interface KakaoAuthObject {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

interface KakaoAPIRequestSettings {
  url: string;
  data?: Record<string, unknown>;
  files?: FileList | File[] | File;
  headers?: Record<string, string>;
  success?: (response: unknown) => void;
  fail?: (error: unknown) => void;
  always?: (response: unknown) => void;
}

interface KakaoAPI {
  request(settings: KakaoAPIRequestSettings): Promise<unknown>;
}

interface KakaoUserProfile {
  nickname?: string;
  thumbnail_image_url?: string;
  profile_image_url?: string;
  is_default_image?: boolean;
}

interface KakaoAccount {
  profile?: KakaoUserProfile;
  profile_needs_agreement?: boolean;
  email?: string;
  email_needs_agreement?: boolean;
  is_email_valid?: boolean;
  is_email_verified?: boolean;
}

interface KakaoUserInfo {
  id: number;
  connected_at?: string;
  kakao_account?: KakaoAccount;
}

// Window 확장 (ambient file이므로 declare global 없이 직접 선언)
interface Window {
  Kakao: KakaoStatic;
}
