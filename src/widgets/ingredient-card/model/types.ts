import { IngredientType } from "~/entities/ingredient";

export type IngredientDetailsProps = {
  _id: string;
  name: string;
  image: string;
  price: number;
  type: IngredientType;
};
