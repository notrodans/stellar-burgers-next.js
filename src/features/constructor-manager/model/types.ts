import { IngredientType } from "~/entities/ingredient";

export type Ingredient = {
  _id: string;
  type: IngredientType;
};
