import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { userService } from "../../services/user.service";
import type { User } from "../../types/user";

export const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    userService
      .getMe()
      .then(setUser)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "사용자 정보 로드 실패"),
      );
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "20px",
        fontFamily: "sans-serif",
      }}>
      <h1>홈</h1>

      {user ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            minWidth: "280px",
          }}>
          {user.profileImageUrl && (
            <img
              src={user.profileImageUrl}
              alt="프로필"
              style={{ width: 72, height: 72, borderRadius: "50%" }}
            />
          )}
          <p style={{ fontWeight: 600, fontSize: "18px" }}>{user.nickname}</p>
          {user.email && (
            <p style={{ color: "#666", fontSize: "14px" }}>{user.email}</p>
          )}
          <p style={{ color: "#999", fontSize: "12px" }}>ID: {user.id}</p>
        </div>
      ) : error ? (
        <p style={{ color: "#e53e3e" }}>{error}</p>
      ) : (
        <p style={{ color: "#666" }}>사용자 정보 로드 중...</p>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "8px",
          padding: "10px 24px",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          background: "#fff",
          cursor: "pointer",
          fontSize: "14px",
        }}>
        로그아웃
      </button>
    </div>
  );
};
