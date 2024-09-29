import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/', // 프록시할 경로
    createProxyMiddleware({
      target: 'http://localhost:8080', // 백엔드 서버 주소
      changeOrigin: true,
      secure: false,
      credentials: true,
    })
  );
}