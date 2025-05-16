import { create } from "zustand";
import { createStoreContext } from "~/shared/lib/zustand";
import { IngredientObject } from "./types";

type IngredientsStore = {
  ingredients: IngredientObject[] | undefined;
  loadIngredients: (ingredients: IngredientObject[]) => void;
};

export const { useStore: useIngredients, Provider: IngredientsProvider } =
  createStoreContext(({ ingredients }: { ingredients: IngredientObject[] }) =>
    create<IngredientsStore>((set) => ({
      ingredients,
      loadIngredients: (ingredients) => {
        set({ ingredients });
      },
    })),
  );
