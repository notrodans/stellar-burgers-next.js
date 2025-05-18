import type { IngredientObject } from "~/entities/ingredient";

export type IngredientDetailsProps = Pick<
  IngredientObject,
  "name" | "image" | "price" | "type" | "_id"
>;
