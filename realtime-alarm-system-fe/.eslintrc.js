module.exports = {
  parser: '@typescript-eslint/parser', // TypeScript 사용 시
  parserOptions: {
    ecmaVersion: 2021, // 최신 ECMAScript 문법 지원
    sourceType: 'module', // ES 모듈 사용
    ecmaFeatures: {
      jsx: true, // JSX 사용
    },
  },
  settings: {
    react: {
      version: 'detect', // React 버전을 자동으로 탐지
    },
  },
  env: {
    browser: true, // 브라우저 환경
    es2021: true, // 최신 ECMAScript 지원
  },
  plugins: ['react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // React 권장 규칙 사용
    'plugin:@typescript-eslint/recommended', // TypeScript 권장 규칙
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // React 17 이상에서는 필요 없음
    'react/prop-types': 'off', // TypeScript 사용 시 PropTypes 사용 안 함
  },
};