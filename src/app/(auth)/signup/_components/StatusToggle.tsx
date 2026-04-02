"use client";

import { CSSProperties } from "react";

type StatusToggleProps = {
  status: "current" | "graduate";
  onStatusChange: (status: "current" | "graduate") => void;
};

const labelStyle: CSSProperties = {
  fontSize: "12px",
  color: "#5C3F3F",
  marginBottom: "8px",
};

const containerStyle: CSSProperties = {
  display: "flex",
  backgroundColor: "#F6EBEB",
  borderRadius: "10px",
  padding: "4px",
  gap: "4px",
};

const buttonBaseStyle: CSSProperties = {
  flex: 1,
  padding: "5px 0",
  fontSize: "13px",
  fontWeight: 500,
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  transition: "all 200ms ease",
};

function getButtonStyle(active: boolean): CSSProperties {
  return {
    ...buttonBaseStyle,
    backgroundColor: active ? "#FFFFFF" : "transparent",
    color: active ? "#9A001F" : "#5C3F3F",
    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
  };
}

export default function StatusToggle({ status, onStatusChange }: StatusToggleProps) {
  return (
    <div>
      <p style={labelStyle}>재학/졸업 여부 (Status)</p>

      <div style={containerStyle}>
        <button
          type="button"
          onClick={() => onStatusChange("current")}
          style={getButtonStyle(status === "current")}
        >
          재학 (Current)
        </button>
        <button
          type="button"
          onClick={() => onStatusChange("graduate")}
          style={getButtonStyle(status === "graduate")}
        >
          졸업 (Graduate)
        </button>
      </div>
    </div>
  );
}
