"use client";

type DeptHeroProps = {
  deptName: string;
  deptEn: string;
};

export default function DeptHero({ deptName, deptEn }: DeptHeroProps) {
  return (
    <div
      style={{
        backgroundColor: "#FFF8F7",
        padding: "80px 0 100px",
        textAlign: "center",
        marginLeft: "calc(-50vw + 50%)",
        marginTop: "calc(-49.54px)",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          fontWeight: 700,
          color: "#1F1A1A",
        }}
      >
        {deptName}
      </h1>
      {deptEn && (
        <p style={{ fontSize: "15px", color: "#9A001F", fontWeight: 400 }}>
          {deptEn}
        </p>
      )}
    </div>
  );
}
