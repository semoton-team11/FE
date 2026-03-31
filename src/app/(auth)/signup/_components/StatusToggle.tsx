"use client";

type StatusToggleProps = {
  status: "current" | "graduate";
  onStatusChange: (status: "current" | "graduate") => void;
};

export default function StatusToggle({ status, onStatusChange }: StatusToggleProps) {
  return (
    <div>
      <p style={{ fontSize: "12px", color: "#5C3F3F", marginBottom: "8px" }}>
        재학/졸업 여부 (Status)
      </p>

      {/* 세그먼트 컨트롤 컨테이너 */}
      <div
        style={{
          display: "flex",
          backgroundColor: "#F6EBEB",
          borderRadius: "10px",
          padding: "4px",
          gap: "4px",
        }}
      >
        <button
          type="button"
          onClick={() => onStatusChange("current")}
          style={{
            flex: 1,
            padding: "5px 0",
            fontSize: "13px",
            fontWeight: 500,
            border: "none",
            borderRadius: "7px",
            cursor: "pointer",
            backgroundColor: status === "current" ? "#FFFFFF" : "transparent",
            color: status === "current" ? "#9A001F" : "#5C3F3F",
            boxShadow: status === "current" ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
            transition: "all 200ms ease",
          }}
        >
          재학 (Current)
        </button>
        <button
          type="button"
          onClick={() => onStatusChange("graduate")}
          style={{
            flex: 1,
            padding: "5px 0",
            fontSize: "13px",
            fontWeight: 500,
            border: "none",
            borderRadius: "7px",
            cursor: "pointer",
            backgroundColor: status === "graduate" ? "#FFFFFF" : "transparent",
            color: status === "graduate" ? "#9A001F" : "#5C3F3F",
            boxShadow: status === "graduate" ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
            transition: "all 200ms ease",
          }}
        >
          졸업 (Graduate)
        </button>
      </div>
    </div>
  );
}
