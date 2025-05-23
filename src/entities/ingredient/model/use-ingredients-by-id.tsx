import { useGetIngredients } from "~/shared/api/public-generated";
import type { Ingredient, UseIngredientsOptions } from "../model/types";

export const useIngredientsById = ({
  ids,
  splitByType = false,
}: UseIngredientsOptions) => {
  const { data: response } = useGetIngredients();
  const data = response?.data;
  if (!data || !ids) return { bun: null, ingredients: [], totalPrice: 0 };

  const ingredients = ids
    .map((item) => {
      const id = typeof item === "string" ? item : item?._id;
      const ingredient = data.find((dataItem) => dataItem._id === id);
      if (typeof item !== "string" && ingredient) {
        return {
          ...ingredient,
          uniqueId: item.uniqueId,
        };
      }
      return ingredient;
    })
    .filter(Boolean) as Array<Ingredient>;

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
