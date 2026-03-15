/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_JS_SDK_APP_KEY: string;
  readonly VITE_NAVER_CLIENT_ID: string;
  readonly VITE_NAVER_CALLBACK_URL?: string;
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
