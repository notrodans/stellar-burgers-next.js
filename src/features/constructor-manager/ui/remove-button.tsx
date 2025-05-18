import { useConstructor, useIngredientCountById } from "~/entities/constructor";
import { ICONS_MAP } from "~/shared/constants";
import { Button } from "~/shared/ui";
import { CONSTANTS_MAP } from "~/shared/constants";
import { IngredientObject } from "~/entities/ingredient";

export const DesktopButtonRemove: React.FC<{ index?: number }> = ({
  index,
}) => {
  const { removeIngredient } = useConstructor();
  return (
    <Button
      onClick={() => removeIngredient("", index)}
      variant="link"
      size="icon"
      className="text-white ml-5 justify-end"
    >
      <ICONS_MAP.RemoveIcon />
    </Button>
  );
};

export const MobileButtonRemove: React.FC<Pick<IngredientObject, "_id">> = ({
  _id,
}) => {
  const { removeText } = CONSTANTS_MAP.features.constructor.remove;
  const removeIngredient = useConstructor((s) => s.removeIngredient);
  const count: number = useIngredientCountById(_id);
  if (count < 1) {
    return undefined;
  }
  return (
    <Button
      variant="link"
      className="text-error p-0"
      onClick={() => removeIngredient(_id)}
    >
      {removeText}
    </Button>
  );
};
