import { IngredientObjectDto } from "~/shared/api/generated";
import type { UseIngredientsOptions } from "../model/types";
import { useIngredients } from "./ingredients.store";

export const useIngredientsById = ({
  ids,
  splitByType = false,
}: UseIngredientsOptions) => {
  const data = useIngredients((s) => s.ingredients);
  if (!data || !ids) return { bun: null, ingredients: [], totalPrice: 0 };

  const ingredients = ids
    .map((item) => {
      const id = typeof item === "string" ? item : item._id;
      const ingredient = data.find((dataItem) => dataItem._id === id);
      if (typeof item !== "string" && ingredient) {
        return {
          ...ingredient,
          uniqueId: item.uniqueId,
        };
      }
      return ingredient;
    })
    .filter(Boolean) as Array<IngredientObjectDto>;

  const totalPrice = ingredients.reduce((acc, ingredient) => {
    return acc + ingredient.price;
  }, 0);

  if (splitByType) {
    const bun =
      ingredients.find((ingredient) => ingredient.type === "bun") || null;
    const others = ingredients.filter(
      (ingredient) => ingredient.type !== "bun",
    );
    return { bun, ingredients: others, totalPrice };
  }

  return { ingredients, totalPrice };
};
