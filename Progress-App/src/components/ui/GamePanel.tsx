import React from "react";

interface GamePanelProps {
  children: React.ReactNode;
  variant?: "stone" | "gold";
  className?: string;
}

export default function GamePanel({
  children,
  variant = "stone",
  className = "",
}: GamePanelProps) {
  const base = "game-panel panel-frame rounded-xl overflow-hidden";
  const variants = {
    stone: "",
    gold: "panel-frame-gold",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`}>
      <div className="game-panel-inner">{children}</div>
    </div>
  );
}

