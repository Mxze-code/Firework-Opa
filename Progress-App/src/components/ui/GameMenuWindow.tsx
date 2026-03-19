import React from "react";

interface GameMenuWindowProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function GameMenuWindow({
  title,
  subtitle,
  children,
}: GameMenuWindowProps) {
  return (
    <div className="game-menu-window">
      <div className="game-menu-frame">
        <div className="game-menu-header">
          <div className="game-menu-header-inner">
            <span
              className="game-menu-title"
              style={{ fontFamily: "var(--font-pixelify)" }}
            >
              {title}
            </span>
            {subtitle && (
              <span className="game-menu-subtitle">{subtitle}</span>
            )}
          </div>
        </div>
        <div className="game-menu-body">{children}</div>
      </div>
    </div>
  );
}

