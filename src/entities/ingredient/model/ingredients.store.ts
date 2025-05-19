import { create } from "zustand";
import { IngredientObject } from "./types";

type IngredientsStore = {
  ingredients: IngredientObject[] | undefined;
  setIngredients: (ingredients: IngredientObject[]) => void;
};

export const useIngredients = create<IngredientsStore>((set) => ({
  ingredients: undefined,
  setIngredients: (ingredients) => {
    set({ ingredients });
  },
}));
