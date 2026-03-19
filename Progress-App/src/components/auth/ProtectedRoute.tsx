"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({
  children,
  requireOnboarding = false,
}: {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}) {
  const { user, isLoading, isConfigured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isConfigured) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (requireOnboarding) {
      router.replace("/onboarding");
    }
  }, [user, isLoading, isConfigured, router, requireOnboarding]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-pulse text-[var(--text-muted)]">Loading...</div>
      </div>
    );
  }

  if (!user && isConfigured) {
    return null;
  }

  return <>{children}</>;
}
