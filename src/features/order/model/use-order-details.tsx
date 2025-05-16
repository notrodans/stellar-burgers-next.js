import { useConstructor } from "~/entities/constructor";

export const useOrderDetails = () => {
  const { bun, ingredients } = useConstructor();
  const isOrderable = bun && ingredients.length > 1;
  const ingredientIds = isOrderable
    ? [bun, ...ingredients.map((item) => item._id), bun]
    : [];
  return { isOrderable, ingredientIds };
};
