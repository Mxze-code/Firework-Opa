import AppLayout from "@/components/layout/AppLayout";
import AppGuard from "@/components/auth/AppGuard";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppGuard>
      <AppLayout>{children}</AppLayout>
    </AppGuard>
  );
}
