import { Ingredient, IngredientType } from "../model";

export const createIngredientSections = (data: Array<Ingredient>) => {
  const ingredientSections = data.reduce<
    Record<IngredientType, Array<Ingredient>>
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
