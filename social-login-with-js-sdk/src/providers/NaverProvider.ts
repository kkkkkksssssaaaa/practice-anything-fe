import type { ISocialProvider } from './SocialProvider';
import type { SocialLoginResult } from '../types/auth';

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const NAVER_CALLBACK_URL =
  import.meta.env.VITE_NAVER_CALLBACK_URL ?? `${window.location.origin}/`;
const NAVER_OAUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_PROFILE_API_URL = 'https://openapi.naver.com/v1/nid/me';

interface NaverProfileResponse {
  resultcode: string;
  message: string;
  response: {
    id: string;
    nickname?: string;
    name?: string;
    email?: string;
    profile_image?: string;
  };
}

function parseHashParams(): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(window.location.hash.slice(1)));
}

async function fetchNaverProfile(
  accessToken: string,
): Promise<NaverProfileResponse['response'] | null> {
  try {
    const res = await fetch(NAVER_PROFILE_API_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as NaverProfileResponse;
    return data.response;
  } catch {
    // CORS 등 네트워크 오류 → 사용자 정보 없이 계속 진행
    return null;
  }
}

async function handleNaverCallback(accessToken: string): Promise<SocialLoginResult> {
  // hash를 URL에서 제거해 새로고침 시 재처리 방지
  window.history.replaceState(null, '', window.location.pathname);

  const profile = await fetchNaverProfile(accessToken);

  return {
    provider: 'naver',
    accessToken,
    user: profile
      ? {
          id: profile.id,
          nickname: profile.nickname,
          profileImageUrl: profile.profile_image,
          email: profile.email,
        }
      : undefined,
  };
}

function redirectToNaver(): Promise<SocialLoginResult> {
  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    response_type: 'token',
    client_id: NAVER_CLIENT_ID,
    redirect_uri: NAVER_CALLBACK_URL,
    state,
  });
  window.location.href = `${NAVER_OAUTH_URL}?${params.toString()}`;
  // 페이지가 이동하므로 Promise는 never resolves
  return new Promise(() => {});
}

export class NaverProvider implements ISocialProvider {
  readonly providerType = 'naver' as const;

  login(): Promise<SocialLoginResult> {
    const { access_token } = parseHashParams();

    if (access_token) {
      return handleNaverCallback(access_token);
    }

    return redirectToNaver();
  }

  logout(): Promise<void> {
    return Promise.resolve();
  }
}
