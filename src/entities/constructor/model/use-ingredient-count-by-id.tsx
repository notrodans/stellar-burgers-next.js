"use client";

import { useConstructor } from "~/entities/constructor";

export const useIngredientCountById = (ingredientId: string) => {
  const { bun, ingredients } = useConstructor();

  if (bun === ingredientId) {
    return 2;
  }
  const count = ingredients.filter(
    (ingredient) => ingredient._id === ingredientId,
  ).length;
  return count;
};
