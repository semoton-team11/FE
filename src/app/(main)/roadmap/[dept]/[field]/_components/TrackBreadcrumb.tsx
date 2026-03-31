"use client";

import Link from "next/link";

type TrackBreadcrumbProps = {
  deptName: string;
  breadcrumbField: string;
};

export default function TrackBreadcrumb({ deptName, breadcrumbField }: TrackBreadcrumbProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
      <Link href={`/roadmap/${encodeURIComponent(deptName)}`} style={{ fontSize: "12px", color: "#9CA3AF", textDecoration: "none", letterSpacing: "1px", fontWeight: 500 }}>
        CAREER PATHS
      </Link>
      <span style={{ fontSize: "12px", color: "#9CA3AF" }}>/</span>
      <span style={{ fontSize: "12px", color: "#9A001F", letterSpacing: "1px", fontWeight: 600 }}>
        {breadcrumbField}
      </span>
    </div>
  );
}
