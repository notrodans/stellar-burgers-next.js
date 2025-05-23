"use client";

import { useDrag, useDrop } from "react-dnd";
import { useConstructor } from "~/entities/constructor";
import type { Ingredient } from "./types";

export const useIngredientDrag = (ingredient: Ingredient) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { _id: ingredient._id, type: ingredient.type },
  });
  return dragRef;
};

export const useIngredientDrop = () => {
  const { setBun, addIngredient } = useConstructor();
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: { _id: string; type: Ingredient["type"] }) {
      if (ingredient.type === "bun") {
        setBun(ingredient._id);
      } else {
        addIngredient(ingredient._id);
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  return { isHover, dropTarget };
};
