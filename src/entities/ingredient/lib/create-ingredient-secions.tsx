import { IngredientObject, IngredientType } from "../model/types";

export const createIngredientSections = (data: Array<IngredientObject>) => {
  const ingredientSections = data.reduce<
    Record<IngredientType, Array<IngredientObject>>
  >(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    },
    { bun: [], sauce: [], main: [] },
  );
  return Object.entries(ingredientSections);
};
