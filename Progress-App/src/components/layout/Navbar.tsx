"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Swords,
  UtensilsCrossed,
  Dumbbell,
  Moon,
  User,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Lobby", icon: LayoutDashboard },
  { href: "/quests", label: "Quests", icon: Swords },
  { href: "/nutrition", label: "Nutrition", icon: UtensilsCrossed },
  { href: "/training", label: "Training", icon: Dumbbell },
  { href: "/recovery", label: "Recovery", icon: Moon },
  { href: "/progress", label: "Progression", icon: TrendingUp },
  { href: "/profile", label: "Character", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:relative md:bottom-auto md:left-auto md:right-auto border-t md:border-t-0 md:border-r border-[var(--border-frame)] bg-[var(--bg-secondary)]/95 backdrop-blur-lg">
      <div className="flex md:flex-col md:h-[calc(100vh-88px)] md:w-20 lg:w-56 md:py-6 md:px-4">
        <div className="flex-1 flex md:flex-col justify-around md:justify-start md:gap-1 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3
                  py-3 md:py-2.5 md:px-4 md:rounded-lg
                  transition-all duration-200
                  ${
                    isActive
                      ? "text-[var(--accent-primary)] bg-[var(--accent-subtle)] border border-[var(--accent-primary)]/30"
                      : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium hidden lg:inline">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
