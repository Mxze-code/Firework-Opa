"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  const refresh = useCallback(async () => {
    if (!isConfigured) {
      setIsLoading(false);
      return;
    }
    try {
      const supabase = createClient();
      const { data: { session: s } } = await supabase.auth.getSession();
      setSession(s);
      setUser(s?.user ?? null);
    } catch {
      setSession(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [isConfigured]);

  useEffect(() => {
    if (!isConfigured) {
      setIsLoading(false);
      return;
    }
    let sub: { unsubscribe: () => void } | null = null;
    (async () => {
      try {
        const supabase = createClient();
        const { data: { session: s } } = await supabase.auth.getSession();
        setSession(s);
        setUser(s?.user ?? null);
        const { data } = supabase.auth.onAuthStateChange((_event: string, s: Session | null) => {
          setSession(s);
          setUser(s?.user ?? null);
        });
        sub = data.subscription;
      } catch {
        setSession(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => sub?.unsubscribe();
  }, [isConfigured]);

  const signOut = useCallback(async () => {
    if (!isConfigured) return;
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } finally {
      setUser(null);
      setSession(null);
    }
  }, [isConfigured]);

  return (
    <AuthContext.Provider
      value={{ user, session, isLoading, isConfigured, signOut, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
