"use client";

import { useGetOrdersProfile } from "~/features/order";
import { CONSTANTS_MAP } from "~/shared/constants";
import { Paragraph, ScrollArea } from "~/shared/ui";
import { OrderCard } from "~/widgets/order-card";

export const ProfileOrdersPage: React.FC = () => {
  const { errorText, loadingText } = CONSTANTS_MAP.pages.profile.orders;
  const { data, isSuccess, isLoading, error } = useGetOrdersProfile();

  if (isLoading) {
    return <Paragraph className="text-center">{loadingText}</Paragraph>;
  }

  if (error) {
    return (
      <Paragraph variant="error" className="text-center">
        {errorText}
      </Paragraph>
    );
  }

  if (isSuccess) {
    return (
      <>
        {data && (
          <ScrollArea size="long" className="flex flex-col lg:basis-1/2">
            {data.orders
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map((item) => (
                <OrderCard
                  key={item.number}
                  ingredients={item.ingredients}
                  status={item.status}
                  name={item.name}
                  number={item.number}
                  createdAt={item.createdAt}
                />
              ))}
          </ScrollArea>
        )}
      </>
    );
  }
};
