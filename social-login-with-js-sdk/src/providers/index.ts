import type { SocialProviderType } from '../types/auth';
import type { ISocialProvider } from './SocialProvider';
import { KakaoProvider } from './KakaoProvider';
import { NaverProvider } from './NaverProvider';

// Apple 추가 시 이 맵에 등록하면 됨
const providerMap: Partial<Record<SocialProviderType, ISocialProvider>> = {
  kakao: new KakaoProvider(),
  naver: new NaverProvider(),
  // apple: new AppleProvider(),
};

export const getSocialProvider = (type: SocialProviderType): ISocialProvider => {
  const provider = providerMap[type];
  if (!provider) {
    throw new Error(`"${type}" 프로바이더는 아직 구현되지 않았습니다.`);
  }
  return provider;
}

export type { ISocialProvider };
