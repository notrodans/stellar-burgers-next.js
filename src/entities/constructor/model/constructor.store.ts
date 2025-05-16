import { createStoreContext } from "~/shared/lib/zustand";
import { Bun, Ingredient } from "./types";
import { create } from "zustand";

type ConstructorStore = {
  ingredients: Array<Ingredient>;
  bun: Bun | null;
};

export const { useStore: useConstructor, Provider: ConstructorProvider } =
  createStoreContext(
    ({
      ingredients,
      bun,
    }: {
      ingredients: ConstructorStore["ingredients"];
      bun: ConstructorStore["bun"];
    }) =>
      create<ConstructorStore>((set) => ({
        ingredients,
        bun,
        setBun: (bun: Bun) => set({ bun }),
        addIngredient: (ingredient: Ingredient) =>
          set((state) => ({
            ingredients: [...state.ingredients, ingredient],
          })),
        removeIngredient: (ingredient: Ingredient) =>
          set((state) => ({
            ingredients: state.ingredients.filter(
              (item) => item._id !== ingredient._id,
            ),
          })),
        moveIngredient: (dragIndex: number, hoverIndex: number) => {
          if (dragIndex === undefined || hoverIndex === undefined) return;
          set((state) => {
            const [movedItem] = state.ingredients.splice(dragIndex, 1);
            return {
              ingredients: [...state.ingredients].splice(
                hoverIndex,
                0,
                movedItem,
              ),
            };
          });
        },
      })),
  );
