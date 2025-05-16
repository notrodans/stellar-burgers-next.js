import { DetailedOrderObject } from "~/entities/order";

export type OrderCardProps = Pick<
  DetailedOrderObject,
  "name" | "number" | "status" | "createdAt" | "ingredients"
>;
