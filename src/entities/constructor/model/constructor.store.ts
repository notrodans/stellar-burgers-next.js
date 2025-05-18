import { createStoreContext } from "~/shared/lib/zustand";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { IngredientID } from "~/shared/api/generated";
import { Ingredient } from "./types";

type ConstructorStore = {
  ingredients: Array<Ingredient>;
  bun: string | null;
  setBun: (bunId: string) => void;
  addIngredient: (_id: IngredientID) => void;
  removeIngredient: (_id: IngredientID, index?: number) => void;
  moveIngredient: (params: { dragIndex?: number; hoverIndex?: number }) => void;
  clearConstructor: () => void;
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
        setBun: (bunId: string) => set({ bun: bunId }),
        addIngredient: (_id: IngredientID) =>
          set((state) => ({
            ingredients: [...state.ingredients, { _id, uniqueId: nanoid() }],
          })),
        removeIngredient: (_id: IngredientID, index?: number) =>
          set((state) => {
            if (index) {
              return {
                ingredients: state.ingredients.filter(
                  (ingredient, ingredientIndex) => index !== ingredientIndex,
                ),
              };
            }

            if (state.bun === _id) {
              return {
                bun: null,
              };
            }

            const indexToRemove = state.ingredients.findIndex(
              (ingredient) => ingredient._id === _id,
            );

            if (indexToRemove !== -1) {
              return {
                ingredients: state.ingredients.filter(
                  (ingredient, index) => indexToRemove !== index,
                ),
              };
            }

            return {};
          }),

        moveIngredient: ({ dragIndex, hoverIndex }) => {
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
        clearConstructor: () =>
          set({
            bun: null,
            ingredients: [],
          }),
      })),
  );
