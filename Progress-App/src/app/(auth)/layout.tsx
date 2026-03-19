import IllustratedLobbyLayout from "@/components/layout/IllustratedLobbyLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IllustratedLobbyLayout>{children}</IllustratedLobbyLayout>
  );
}
