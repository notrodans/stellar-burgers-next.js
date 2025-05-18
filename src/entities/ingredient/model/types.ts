import React from "react";
import type { ConnectDragSource } from "react-dnd";
import { IngredientID, IngredientObjectDto } from "~/shared/api/generated";

export type IngredientObject = IngredientObjectDto;

export type IngredientType = "bun" | "sauce" | "main";

export interface IngredientPriceProps {
  value: number;
  digitsSize?: "medium" | "large";
  className?: string;
}

export interface IngredientProps
  extends Pick<IngredientObject, "_id" | "image" | "name" | "price"> {
  counterSlot?: React.ReactNode;
  removeSlot?: React.ReactNode;
  addSlot?: React.ReactNode;
  dragRef?: ConnectDragSource;
}

export interface ConstructorIngredientProps
  extends Pick<IngredientObject, "image" | "name" | "_id"> {
  priceSlot: React.ReactNode;
  actionSlot: React.ReactNode;
  dragSlot: React.ReactNode;
  dragRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export interface OrderIngredientProps
  extends Pick<IngredientObject, "image_mobile" | "name" | "price"> {
  count: number;
}

export type IngredientModalProps = Pick<
  IngredientObject,
  "image_large" | "name" | "calories" | "carbohydrates" | "fat" | "proteins"
>;

export type UseIngredientsOptions = {
  ids?: Array<IngredientID | { _id: IngredientID; uniqueId: string }>;
  splitByType?: boolean;
  computeCount?: boolean;
};
