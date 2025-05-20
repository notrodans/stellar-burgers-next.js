import { DetailedOrderObject } from "~/shared/api/public-generated";

export type IngredientsIds = string[];

export type OrderList = {
  orders: DetailedOrderObject[] | [];
  total: number;
  totalToday: number;
  success: boolean;
};
