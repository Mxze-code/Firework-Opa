import Link from "next/link";
import Button from "@/components/ui/Button";
import GameMenuWindow from "@/components/ui/GameMenuWindow";
import IllustratedLobbyLayout from "@/components/layout/IllustratedLobbyLayout";

export default function LandingPage() {
  return (
    <IllustratedLobbyLayout>
      <GameMenuWindow
        title="Begin Journey"
        subtitle="Create your character or continue your progress"
      >
        <div className="space-y-4 text-center">
          <h1
            className="text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-pixelify)" }}
          >
            Ascend
          </h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-xl mx-auto font-sans">
            Enter your camp, build your character, and turn real habits into progress.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/register">
              <Button size="lg" variant="primary" className="min-w-[12rem]">
                Create Character
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="secondary" className="min-w-[12rem]">
                Continue Journey
              </Button>
            </Link>
          </div>

          <div className="pt-1 text-sm text-[var(--text-muted)]">
            <Link href="/login" className="hover:text-[var(--text-primary)]">
              Existing traveler? Continue journey
            </Link>
          </div>
        </div>
      </GameMenuWindow>
    </IllustratedLobbyLayout>
  );
}
