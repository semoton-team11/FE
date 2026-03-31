"use client";

import React from "react";

type UnderlineFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: React.ReactNode;
};

export default function UnderlineField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  rightIcon,
}: UnderlineFieldProps) {
  return (
    <div>
      <p style={{ fontSize: "12px", color: "#5C3F3F", marginBottom: "6px" }}>{label}</p>
      <div style={{ position: "relative" }}>
        <input
          className="auth-input"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            borderBottom: "1.5px solid #E6BDBB99",
            padding: "6px 32px 6px 0",
            fontSize: "14px",
            color: "#1F1A1A",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-bottom-color 200ms ease",
          }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#9A001F")}
          onBlur={(e) => {
            if (!e.currentTarget.value) {
              e.currentTarget.style.borderBottomColor = "#E6BDBB99";
            }
          }}
        />
        {rightIcon && (
          <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}>
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}
