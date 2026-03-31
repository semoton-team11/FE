import { SpinnerIcon } from "./Icons";

export function LoadingOverlay() {
  return (
    <div style={{
      position: "fixed", inset: 0,
      backgroundColor: "rgba(0,0,0,0.35)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: "#FFFFFF", borderRadius: "20px",
        width: "400px", height: "160px",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px",
      }}>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }`}</style>
        <SpinnerIcon />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "#1F1A1A", marginBottom: "4px" }}>계산중입니다</p>
          <p style={{ fontSize: "14px", color: "#78716C" }}>잠시만 기다려주세요</p>
        </div>
      </div>
    </div>
  );
}
