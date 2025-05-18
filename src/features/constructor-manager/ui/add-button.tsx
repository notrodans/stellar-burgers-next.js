import { useConstructor } from "~/entities/constructor";
import type { IngredientObject } from "~/entities/ingredient";
import { CONSTANTS_MAP } from "~/shared/constants";
import { Button } from "~/shared/ui";

export const MobileButtonAdd: React.FC<
  Pick<IngredientObject, "_id" | "type">
> = ({ _id, type }) => {
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
