"use client";

import { useState } from "react";
import { useGetStreamingOrders } from "~/entities/order";
import { CONSTANTS_MAP } from "~/shared/constants";
import { cn } from "~/shared/lib";
import { Heading, Loader, Paragraph, ScrollArea, Tab } from "~/shared/ui";
import { OrderCard } from "~/widgets/order-card";

export const FeedPage: React.FC = () => {
  const content = CONSTANTS_MAP.pages.feed;
  const [currentTab, setCurrentTab] = useState("mainTab");

  const { data, error, isLoading, isSuccess } = useGetStreamingOrders();

  if (isLoading) {
    return (
      <Loader text={content.orders.loadingText} className="pt-2 lg:pt-10" />
    );
  }

  if (error) {
    return <Paragraph size="large">{content.orders.errorText}</Paragraph>;
  }

  if (data && isSuccess) {
    return (
      <>
        <Heading className="text-center lg:text-left mb-6">
          {content.mainText}
        </Heading>
        <div className="grid grid-cols-2 h-10 mt-5 mb-10 lg:hidden">
          {Object.entries(content.tabs).map(([type, name]) => (
            <Tab
              key={type}
              value={type}
              active={currentTab === type}
              onClick={setCurrentTab}
            >
              {name}
            </Tab>
          ))}
        </div>
        <div className="flex flex-row flex-wrap px-2 lg:gap-10 lg:flex-nowrap lg:px-0">
          <ScrollArea
            size="long"
            className={cn(
              "lg:flex flex-col lg:basis-1/2",
              currentTab === "mainTab" ? "flex" : "hidden",
            )}
          >
            {data.orders.map((item) => (
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
          <div
            className={cn(
              "lg:flex flex-col gap-10 w-full lg:w-1/2",
              currentTab === "statsTab" ? "flex" : "hidden",
            )}
          >
            <div className="flex flex-row justify-between gap-6">
              <span className="w-1/2">
                <Paragraph size="medium" className="font-bold">
                  {content.doneText}
                </Paragraph>
                <ScrollArea
                  variant="horizontal"
                  className="grid gap-x-4 grid-flow-col grid-rows-6"
                >
                  {data.orders
                    .filter((order) => order.status === "done")
                    .map((order) => (
                      <Paragraph
                        key={order.number}
                        size="medium"
                        font="digits"
                        variant="success"
                      >
                        {order.number}
                      </Paragraph>
                    ))}
                </ScrollArea>
              </span>
              <span className="w-1/2">
                <Paragraph size="medium" className="font-bold">
                  {content.pendingText}
                </Paragraph>
                <ScrollArea
                  variant="horizontal"
                  className="grid gap-x-4 grid-flow-col grid-rows-6"
                >
                  {data.orders
                    .filter((order) => order.status === "pending")
                    .map((order) => (
                      <Paragraph key={order.number} size="medium" font="digits">
                        {order.number}
                      </Paragraph>
                    ))}
                </ScrollArea>
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <Paragraph size="medium" className="font-bold">
                  {content.doneAllTimeText}
                </Paragraph>
                <Paragraph size="heading" font="digits" className="text-shadow">
                  {data.total}
                </Paragraph>
              </div>
              <div>
                <Paragraph size="medium" className="font-bold">
                  {content.doneTodayText}
                </Paragraph>
                <Paragraph size="heading" font="digits" className="text-shadow">
                  {data.totalToday}
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
