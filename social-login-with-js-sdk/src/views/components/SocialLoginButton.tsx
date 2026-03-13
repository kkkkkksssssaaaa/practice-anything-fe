import type { SocialProviderType } from "../../types/auth";

interface Props {
  provider: SocialProviderType;
  onClick: () => void;
  disabled?: boolean;
}

const PROVIDER_CONFIG: Record<
  SocialProviderType,
  { label: string; bgColor: string; textColor: string }
> = {
  kakao: { label: "카카오로 로그인", bgColor: "#FEE500", textColor: "#000000" },
  naver: { label: "네이버로 로그인", bgColor: "#03C75A", textColor: "#FFFFFF" },
  apple: { label: "Apple로 로그인", bgColor: "#000000", textColor: "#FFFFFF" },
};

export const SocialLoginButton = ({ provider, onClick, disabled }: Props) => {
  const { label, bgColor, textColor } = PROVIDER_CONFIG[provider];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: "none",
        borderRadius: "8px",
        padding: "14px 24px",
        fontSize: "16px",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        width: "300px",
        opacity: disabled ? 0.6 : 1,
        transition: "opacity 0.2s",
      }}>
      {label}
    </button>
  );
};
