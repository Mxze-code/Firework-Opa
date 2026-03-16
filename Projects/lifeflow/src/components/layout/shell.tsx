import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../utils";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/calendar", label: "Calendar" },
  { href: "/routines", label: "Routines" },
  { href: "/habits", label: "Habits" },
  { href: "/notes", label: "Notes" },
  { href: "/shopping", label: "Shopping" },
  { href: "/meals", label: "Meals" },
  { href: "/goals", label: "Goals" },
  { href: "/focus", label: "Focus" },
  { href: "/health", label: "Health" },
  { href: "/finance", label: "Finance" },
  { href: "/weekly-review", label: "Weekly Review" },
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="lifeflow-shell">
      <header className="border-b border-border/60 bg-black/40 backdrop-blur-lg">
        <div className="container flex h-14 items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-blue-500 via-sky-400 to-emerald-400 shadow-soft" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                LifeFlow
              </span>
              <span className="text-[11px] text-muted-foreground">
                Dein persönliches Operating System
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname?.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 transition-colors hover:bg-accent/60 hover:text-foreground",
                      active && "bg-accent text-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/settings">Settings</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/login">Dashboard öffnen</Link>
            </Button>
          </div>
        </div>
      </header>

      <motion.main
        className="flex-1"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {children}
      </motion.main>
    </div>
  );
}

