"use client";

import { Paragraph } from "~/shared/ui";
import type { OrderProps } from "../model/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CONSTANTS_MAP, ROUTER_PATHS } from "~/shared/constants";

export const Order: React.FC<OrderProps> = ({
  number,
  status,
  name,
  date,
  priceSlot,
  ingredientSlot,
}) => {
  const pathname = usePathname();
  const statusByTag = CONSTANTS_MAP.entities.order.status[status];

  return (
    <Link
      href={{
        pathname:
          pathname === ROUTER_PATHS.FEED
            ? ROUTER_PATHS.FEED + `/${number}`
            : ROUTER_PATHS.PROFILE_ORDERS + `/${number}`,
        query: { background: pathname },
      }}
      className="block bg-dark rounded-3xl mx-2 mb-2"
    >
      <div className="flex flex-col gap-2 p-6">
        <div className="flex justify-between mb-4">
          <Paragraph font="digits" size="medium">
            #{number}
          </Paragraph>
          <Paragraph variant="inactive">{date}</Paragraph>
        </div>
        <Paragraph size="medium" className="font-bold">
          {name}
        </Paragraph>
        <Paragraph variant="success" className="mb-4">
          {statusByTag}
        </Paragraph>
        <div className="flex justify-between items-center">
          {ingredientSlot}
          {priceSlot}
        </div>
      </div>
    </Link>
  );
};
