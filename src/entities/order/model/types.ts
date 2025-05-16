import { DetailedOrderObjectDtoStatus } from "~/shared/api/generated";

type OrderObject = {
  name: string;
  number: number;
  status: DetailedOrderObjectDtoStatus;
};

export type OrderProps = {
  date: string;
  priceSlot: React.ReactNode;
  ingredientSlot: React.ReactNode;
} & OrderObject;
