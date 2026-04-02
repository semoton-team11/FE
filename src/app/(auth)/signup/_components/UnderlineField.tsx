"use client";

import React, { CSSProperties } from "react";

type UnderlineFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: React.ReactNode;
};

const labelStyle: CSSProperties = {
  fontSize: "12px",
  color: "#5C3F3F",
  marginBottom: "6px",
};

const inputWrapperStyle: CSSProperties = {
  position: "relative",
};

const inputStyle: CSSProperties = {
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
};

const rightIconWrapperStyle: CSSProperties = {
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
};

function handleInputFocus(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderBottomColor = "#9A001F";
}

function handleInputBlur(e: React.FocusEvent<HTMLInputElement>) {
  if (!e.currentTarget.value) {
    e.currentTarget.style.borderBottomColor = "#E6BDBB99";
  }
}

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
      <p style={labelStyle}>{label}</p>
      <div style={inputWrapperStyle}>
        <input
          className="auth-input"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={inputStyle}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {rightIcon && (
          <div style={rightIconWrapperStyle}>{rightIcon}</div>
        )}
      </div>
    </div>
  );
}
