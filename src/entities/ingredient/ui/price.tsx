import { ICONS_MAP } from "~/shared/constants";
import { cn } from "~/shared/lib/css";
import { Paragraph } from "~/shared/ui";
import { IngredientPriceProps } from "../model";

export const IngredientPrice: React.FC<IngredientPriceProps> = ({
  value,
  digitsSize = "medium",
  className,
}) => {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Paragraph font="digits" size={digitsSize}>
        {value}
      </Paragraph>
      <ICONS_MAP.PriceIcon />
    </span>
  );
};
