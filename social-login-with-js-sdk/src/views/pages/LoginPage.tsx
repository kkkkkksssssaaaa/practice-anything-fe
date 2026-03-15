import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocialLoginButton } from "../components/SocialLoginButton";
import { authService } from "../../services/auth.service";
import type { SocialProviderType } from "../../types/auth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<SocialProviderType | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 네이버 OAuth 리디렉트 복귀 감지:
  // 네이버 로그인 후 현재 페이지로 돌아오면 URL hash에 access_token이 포함된다.
  useEffect(() => {
    if (!window.location.hash.includes("access_token")) return;

    setLoading("naver");
    authService
      .loginWithSocial("naver")
      .then(() => navigate("/home"))
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "네이버 로그인 중 오류가 발생했습니다.",
        );
        setLoading(null);
      });
  }, [navigate]);

  const handleLogin = async (provider: SocialProviderType) => {
    setLoading(provider);
    setError(null);
    try {
      await authService.loginWithSocial(provider);
      navigate("/home");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.",
      );
    } finally {
      setLoading(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "16px",
        fontFamily: "sans-serif",
      }}>
      <h1 style={{ marginBottom: "8px" }}>소셜 로그인 테스트</h1>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        로그인할 플랫폼을 선택하세요
      </p>

      <SocialLoginButton
        provider="kakao"
        onClick={() => handleLogin("kakao")}
        disabled={loading !== null}
      />

      <SocialLoginButton
        provider="naver"
        onClick={() => handleLogin("naver")}
        disabled={loading !== null}
      />

      {/* Apple 프로바이더 구현 후 주석 해제 */}
      {/* <SocialLoginButton provider="apple" onClick={() => handleLogin('apple')} disabled={loading !== null} /> */}

      {loading && <p style={{ color: "#666" }}>{loading} 로그인 처리 중...</p>}
      {error && (
        <p style={{ color: "#e53e3e", maxWidth: "300px", textAlign: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
};
