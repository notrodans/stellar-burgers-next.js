import { useDrag, useDrop } from "react-dnd";
import { useConstructor } from "~/entities/constructor";

export const useConstructorDND = (index?: number) => {
  const moveIngredient = useConstructor((s) => s.moveIngredient);
  const [, dragRef] = useDrag({
    type: "move",
    item: { index },
  });
  const [, dropTarget] = useDrop({
    accept: "move",
    drop(item: { index: number }) {
      if (index !== item.index) {
        moveIngredient({ dragIndex: item.index, hoverIndex: index });
      }
    },
  });
  return { dragRef, dropTarget };
};
