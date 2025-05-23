import { IngredientType } from "~/entities/ingredient";

export type ConstructorElementProps = {
  name: string;
  _id: string;
  price: number;
  image: string;
  type: IngredientType;
  index?: number;
  positionClassName: string;
};

export type Ingredient = {
  _id: string;
  type: IngredientType;
};
