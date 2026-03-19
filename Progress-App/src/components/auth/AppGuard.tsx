"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

const ONBOARDING_PATH = "/onboarding";
const LOGIN_PATH = "/login";

export default function AppGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isConfigured } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!isConfigured || !isSupabaseConfigured()) return;

    if (!user) {
      router.replace(LOGIN_PATH);
      return;
    }

    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("profiles")
          .select("onboarding_complete")
          .eq("id", user.id)
          .single();
        if (data && !data.onboarding_complete && pathname !== ONBOARDING_PATH) {
          router.replace(ONBOARDING_PATH);
        }
      } catch {
        // ignore
      }
    })();
  }, [user, isLoading, isConfigured, router, pathname]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div
          className="text-[var(--text-muted)] animate-pulse"
          style={{ fontFamily: "var(--font-pixelify)" }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
