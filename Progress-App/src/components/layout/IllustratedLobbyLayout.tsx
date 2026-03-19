import React from "react";

interface IllustratedLobbyLayoutProps {
  children: React.ReactNode;
}

export default function IllustratedLobbyLayout({
  children,
}: IllustratedLobbyLayoutProps) {
  return (
    <div className="illustrated-lobby">
      <div className="illustrated-lobby__scene" />
      <div className="illustrated-lobby__shade" />
      <div className="illustrated-lobby__ambience" aria-hidden>
        <div className="illustrated-lobby__fire" />
        <div className="illustrated-lobby__fire-core" />
        <div className="illustrated-lobby__smoke illustrated-lobby__smoke--one" />
        <div className="illustrated-lobby__smoke illustrated-lobby__smoke--two" />
      </div>
      <div className="illustrated-lobby__overlay">
        <div className="illustrated-lobby__content">{children}</div>
      </div>
    </div>
  );
}

