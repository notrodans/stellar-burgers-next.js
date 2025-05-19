import { DetailedOrderObject } from "~/shared/api/generated";

export type OrderCardProps = {
  name: string;
  status: "done" | "pending" | "created";
  number: number;
  createdAt: string;
  ingredients: DetailedOrderObject["ingredients"];
};
