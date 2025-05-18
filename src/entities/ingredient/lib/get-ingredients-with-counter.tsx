import { IngredientObject, OrderIngredientProps } from "../model/types";

export const getIngredientsWithCounter = (data: Array<IngredientObject>) => {
  const ingredientsWithCounter = data.reduce<
    Record<string, OrderIngredientProps>
  >((acc, cur) => {
    const id = cur._id;
    if (!acc[id]) {
      acc[id] = { ...cur, count: 1 };
    } else {
      acc[id].count += 1;
    }
    return acc;
  }, {});
  return Object.values(ingredientsWithCounter);
};
