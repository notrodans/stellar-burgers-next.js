import { DetailedOrderObjectDto } from "~/shared/api/generated";

export type OrderCardProps = Pick<
  DetailedOrderObjectDto,
  "name" | "number" | "status" | "createdAt" | "ingredients"
>;
