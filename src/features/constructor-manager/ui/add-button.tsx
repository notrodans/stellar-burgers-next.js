import { useConstructor } from "~/entities/constructor";
import { CONSTANTS_MAP } from "~/shared/constants";
import { Button } from "~/shared/ui";
import { Ingredient } from "../model/types";

export const MobileButtonAdd: React.FC<Ingredient> = ({ _id, type }) => {
  const { addText } = CONSTANTS_MAP.features.constructor.add;
  const { setBun, addIngredient } = useConstructor();

  return (
    <Button
      variant="link"
      className="text-white p-0"
      onClick={() => (type === "bun" ? setBun(_id) : addIngredient(_id))}
    >
      {addText}
    </Button>
  );
};
