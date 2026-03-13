import type { ISocialProvider } from './SocialProvider';
import type { SocialLoginResult } from '../types/auth';

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_JS_SDK_APP_KEY;

export class KakaoProvider implements ISocialProvider {
  readonly providerType = 'kakao' as const;

  login(): Promise<SocialLoginResult> {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_APP_KEY);
    }

    return new Promise((resolve, reject) => {
      window.Kakao.Auth.login({
        success: (authObj) => {
          // 로그인 성공 후 SDK를 통해 사용자 정보 조회
          window.Kakao.API.request({ url: '/v2/user/me' })
            .then((response) => {
              const userInfo = response as KakaoUserInfo;
              resolve({
                provider: 'kakao',
                accessToken: authObj.access_token,
                user: {
                  id: String(userInfo.id),
                  nickname: userInfo.kakao_account?.profile?.nickname,
                  profileImageUrl:
                    userInfo.kakao_account?.profile?.profile_image_url,
                  email: userInfo.kakao_account?.email,
                },
              });
            })
            .catch(() => {
              // 사용자 정보 조회 실패 시 토큰만 반환
              resolve({
                provider: 'kakao',
                accessToken: authObj.access_token,
              });
            });
        },
        fail: (err) => {
          reject(new Error(`카카오 로그인 실패: ${JSON.stringify(err)}`));
        },
      });
    });
  }

  logout(): Promise<void> {
    return new Promise((resolve) => {
      if (!window.Kakao.Auth.getAccessToken()) {
        resolve();
        return;
      }
      window.Kakao.Auth.logout(() => resolve());
    });
  }
}
