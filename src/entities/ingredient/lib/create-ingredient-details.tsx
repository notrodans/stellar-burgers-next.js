import { CONSTANTS_MAP } from "~/shared/constants";

export const createIngredientDetails = (
  calories: number,
  carbohydrates: number,
  fat: number,
  proteins: number,
) => {
  const { details } = CONSTANTS_MAP.entities.ingredient;
  return [
    { label: details.calories, value: calories },
    { label: details.carbohydrates, value: carbohydrates },
    { label: details.fat, value: fat },
    { label: details.proteins, value: proteins },
  ];
};
