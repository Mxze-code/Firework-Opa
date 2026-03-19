"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, TrendingUp, Award, CheckCircle } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

const ICONS = {
  stat: TrendingUp,
  buff: Zap,
  xp: Award,
  success: CheckCircle,
  info: CheckCircle,
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 z-50 flex flex-col gap-2 max-w-sm md:ml-auto">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl border
                ${
                  toast.type === "stat"
                    ? "bg-[var(--accent-subtle)] border-[var(--accent-primary)]/30"
                    : toast.type === "buff"
                      ? "bg-[var(--success)]/10 border-[var(--success)]/30"
                      : toast.type === "xp"
                        ? "bg-[var(--xp-accent)]/10 border-[var(--xp-accent)]/30"
                        : "bg-[var(--bg-card)] border-[var(--border-default)]"
                }
              `}
              onClick={() => removeToast(toast.id)}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  toast.type === "stat"
                    ? "text-[var(--accent-primary)]"
                    : toast.type === "buff"
                      ? "text-[var(--success)]"
                      : toast.type === "xp"
                        ? "text-[var(--xp-accent)]"
                        : "text-[var(--text-muted)]"
                }`}
              />
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {toast.message}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
