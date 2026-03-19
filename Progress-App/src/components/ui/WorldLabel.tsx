import React from "react";

interface WorldLabelProps {
  children: React.ReactNode;
  align?: "left" | "center";
}

export default function WorldLabel({ children, align = "center" }: WorldLabelProps) {
  return (
    <div
      className={`world-label world-panel panel-corner px-4 py-2 mb-4 inline-block ${
        align === "center" ? "mx-auto" : ""
      }`}
    >
      <span
        className="text-xs tracking-[0.25em] text-[var(--gold)]"
        style={{ fontFamily: "var(--font-pixelify)" }}
      >
        {children}
      </span>
    </div>
  );
}

