import { create } from "zustand";
import { nanoid } from "nanoid";
import { IngredientID } from "~/shared/api/generated";
import { Ingredient } from "./types";

type ConstructorStore = {
  ingredients: Array<Ingredient>;
  bun: string | null;
  setBun: (bunId: string) => void;
  addIngredient: (_id: IngredientID) => void;
  removeIngredient: ({
    _id,
    index,
  }: {
    _id?: IngredientID;
    index?: number;
  }) => void;
  moveIngredient: (params: { dragIndex?: number; hoverIndex?: number }) => void;
  clearConstructor: () => void;
};

export const useConstructor = create<ConstructorStore>((set) => ({
  ingredients: [],
  bun: null,
  setBun: (bunId) => set({ bun: bunId }),
  addIngredient: (_id) => {
    set((state) => ({
      ingredients: [
        ...state.ingredients,
        {
          _id,
          uniqueId: nanoid(),
        },
      ],
    }));
  },
  removeIngredient: ({ index, _id }) => {
    set((state) => {
      if (index !== undefined) {
        const newIngredients = [...state.ingredients];
        newIngredients.splice(index, 1);
        return { ingredients: newIngredients };
      }

      if (_id !== undefined) {
        const indexToRemove = state.ingredients.findIndex(
          (ingredient) => ingredient._id === _id,
        );

        if (indexToRemove !== -1) {
          const newIngredients = [...state.ingredients];
          newIngredients.splice(indexToRemove, 1);

          const shouldClearBun = state.bun === _id;
          return {
            ingredients: newIngredients,
            bun: shouldClearBun ? null : state.bun,
          };
        }
      }

      return state;
    });
  },
  moveIngredient: ({ dragIndex, hoverIndex }) => {
    if (dragIndex === undefined || hoverIndex === undefined) return;
    set((state) => {
      const newIngredients = [...state.ingredients];
      const [movedItem] = newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, movedItem);
      return { ingredients: newIngredients };
    });
  },
  clearConstructor: () => set({ bun: null, ingredients: [] }),
}));
