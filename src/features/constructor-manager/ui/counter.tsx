"use client";

import { useIngredientCountById } from "~/entities/constructor";
import { Paragraph } from "~/shared/ui";
import { Ingredient } from "../model/types";

export const Counter: React.FC<{ _id: Ingredient["_id"] }> = ({ _id }) => {
  const count: number = useIngredientCountById(_id);
  if (count < 1) {
    return undefined;
  }
  return (
    <div className="absolute right-0 top-0 min-w-[16px] h-[32px] px-2 flex items-center justify-center bg-accent rounded-full">
      <Paragraph font="digits" size="medium">
        {count}
      </Paragraph>
    </div>
  );
};
