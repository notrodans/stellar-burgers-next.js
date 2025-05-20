import { DetailedOrderObjectStatus } from "~/shared/api/public-generated";

type OrderObject = {
  name: string;
  number: number;
  status: DetailedOrderObjectStatus;
};

export type OrderProps = {
  date: string;
  priceSlot: React.ReactNode;
  ingredientSlot: React.ReactNode;
} & OrderObject;

export type OrderModalProps = {
  name: string;
  order: {
    number: number;
  };
};
