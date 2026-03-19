"use client";

import {
  UtensilsCrossed,
  Coffee,
  Sun,
  Moon,
  Cookie,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/empty/EmptyState";
import { useUserData } from "@/hooks/useUserData";
import type { MealType } from "@/types";

const MEAL_ICONS: Record<MealType, typeof Coffee> = {
  breakfast: Coffee,
  lunch: Sun,
  dinner: Moon,
  snack: Cookie,
};

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

export default function NutritionPage() {
  const { meals, preferences, isLoading, error } = useUserData();

  const totalProtein = meals.reduce((s, m) => s + (m.total_protein ?? 0), 0);
  const totalCarbs = meals.reduce((s, m) => s + (m.total_carbs ?? 0), 0);
  const totalFats = meals.reduce((s, m) => s + (m.total_fats ?? 0), 0);
  const totalCalories = meals.reduce((s, m) => s + (m.total_calories ?? 0), 0);
  const proteinTarget = preferences?.protein_target_g ?? 150;

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-[var(--text-muted)]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 rounded-lg bg-[var(--danger)]/10 text-[var(--danger)]">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8 world-panel rounded-lg px-4 py-6 border-2 border-[var(--stone-mid)]">
        <span className="text-xs tracking-widest text-[var(--gold)]" style={{ fontFamily: "var(--font-pixelify)" }}>
          COOKING AREA
        </span>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-pixelify)" }}>
          Nutrition
        </h1>
        <p className="text-[var(--text-muted)]">
          Log meals. Food choices affect your build — protein → Strength,
          vegetables → Vitality, carrots → Vision.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <p className="text-sm text-[var(--text-muted)]">Protein</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            {totalProtein}g
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Target: {proteinTarget}g
          </p>
        </Card>
        <Card>
          <p className="text-sm text-[var(--text-muted)]">Carbs</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            {totalCarbs}g
          </p>
        </Card>
        <Card>
          <p className="text-sm text-[var(--text-muted)]">Fats</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            {totalFats}g
          </p>
        </Card>
        <Card>
          <p className="text-sm text-[var(--text-muted)]">Calories</p>
          <p className="text-2xl font-bold text-[var(--xp-accent)]">
            {totalCalories}
          </p>
        </Card>
      </div>

      <div className="mb-6">
        <Button variant="primary">Log meal</Button>
      </div>

      {meals.length === 0 ? (
        <EmptyState
          icon={UtensilsCrossed}
          title="No meals logged today"
          description="Log meals to track macros and earn stat bonuses. Protein supports Strength, vegetables boost Vitality, fish aids Recovery."
          actionLabel="Log meal"
        />
      ) : (
        <div className="space-y-4">
          {meals.map((meal) => {
            const Icon = MEAL_ICONS[meal.meal_type as MealType];
            return (
              <Card key={meal.id}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[var(--accent-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--text-primary)] capitalize">
                      {meal.meal_type}
                    </h3>
                    <div className="mt-3 flex gap-4 text-xs text-[var(--text-muted)]">
                      <span>P: {meal.total_protein ?? 0}g</span>
                      <span>C: {meal.total_carbs ?? 0}g</span>
                      <span>F: {meal.total_fats ?? 0}g</span>
                      <span>{meal.total_calories ?? 0} cal</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
