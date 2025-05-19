"use client";

import {
  IngredientPrice,
  OrderIngredient,
  getIngredientsWithCounter,
  useIngredientsById,
} from "~/entities/ingredient";
import { formatDate, getApiError } from "~/shared/lib";
import { CONSTANTS_MAP } from "~/shared/constants";
import { Loader, Paragraph, ScrollArea } from "~/shared/ui";
import { notFound, useParams } from "next/navigation";
import { useOrderGetById } from "~/features/order";

export const OrderPage: React.FC = () => {
  const { status } = CONSTANTS_MAP.entities.order;
  const { loadingText, ingredientsText } = CONSTANTS_MAP.pages.order;
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading, isSuccess } = useOrderGetById(id);
  const { ingredients, totalPrice } = useIngredientsById({
    ids: data?.ingredients,
  });

  if (isSuccess && !data?._id) {
    return notFound();
  }

  if (isLoading) {
    return <Loader text={loadingText} className="pt-2 lg:pt-10" />;
  }

  if (error) {
    return <div>{getApiError(error)}</div>;
  }

  if (data) {
    return (
      <div className="flex flex-col gap-5 lg:gap-10 max-w-2xl mx-auto">
        <Paragraph
          font="digits"
          size="medium"
          className="text-center py-2 lg:py-10"
        >
          #{id}
        </Paragraph>
        <div className="flex flex-col gap-2">
          <Paragraph className="font-bold" size="medium">
            {data.name}
          </Paragraph>
          <Paragraph variant="success">{status[data.status]}</Paragraph>
        </div>
        <div className="flex flex-col gap-4">
          <Paragraph className="font-bold" size="medium">
            {ingredientsText}
          </Paragraph>
          <ScrollArea size="short" className="flex flex-col gap-2 pr-2">
            {getIngredientsWithCounter(ingredients).map((item, index) => (
              <OrderIngredient
                key={index}
                image_mobile={item.image_mobile}
                name={item.name}
                price={item.price}
                count={item.count}
              />
            ))}
          </ScrollArea>
        </div>
        <div className="flex flex-row flex-nowrap justify-between">
          <Paragraph variant="inactive">{formatDate(data.createdAt)}</Paragraph>
          <IngredientPrice value={totalPrice} />
        </div>
      </div>
    );
  }
};
