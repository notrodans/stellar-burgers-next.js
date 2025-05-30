"use client";

import { useConstructor } from "~/entities/constructor";
import { IngredientPrice, useIngredientsById } from "~/entities/ingredient";
import {
  MemoizedConstructorElement,
  useIngredientDrop,
} from "~/features/constructor-manager";
import { OrderButton } from "~/features/order";
import { CONSTANTS_MAP } from "~/shared/constants";
import { cn } from "~/shared/lib";
import { Heading, ScrollArea } from "~/shared/ui";

export const ConstructorContainer: React.FC = () => {
  const { onAddBunText, onEmptyText } =
    CONSTANTS_MAP.pages.home.constructorContainer;
  const { isHover, dropTarget } = useIngredientDrop();
  const { bun: bunId, ingredients: ingredientsIds } = useConstructor();
  const { bun, ingredients, totalPrice } = useIngredientsById({
    ids: bunId ? [bunId, ...ingredientsIds, bunId] : ingredientsIds,
    splitByType: true,
  });

  return (
    <>
      <div
        data-cy="constructor-container"
        /* @ts-expect-error legacy ref */
        ref={dropTarget}
        className={cn(
          "h-full mb-2",
          isHover
            ? "border-dashed border-2 border-inactive rounded-lg"
            : "border-solid border-2 border-transparent",
        )}
      >
        {ingredients.length > 0 || bun ? (
          <div className="hidden lg:flex flex-col gap-2">
            {bun ? (
              <MemoizedConstructorElement
                _id={bun._id}
                name={bun.name}
                price={bun.price}
                image={bun.image}
                type={bun.type}
                positionClassName="rounded-[88px_88px_40px_40px]"
              />
            ) : (
              <Heading className="hidden lg:block text-shadow text-center pb-10">
                {onAddBunText}
              </Heading>
            )}
            <ScrollArea size="short" className="flex flex-col gap-2">
              {ingredients?.map((item, index) => (
                <MemoizedConstructorElement
                  index={index}
                  _id={item._id}
                  key={item.uniqueId}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  type={item.type}
                  positionClassName="rounded-full"
                />
              ))}
            </ScrollArea>
            {bun && (
              <MemoizedConstructorElement
                _id={bun._id}
                name={bun.name}
                price={bun.price}
                image={bun.image}
                type={bun.type}
                positionClassName="rounded-[40px_40px_88px_88px]"
              />
            )}
          </div>
        ) : (
          <Heading className="hidden lg:block text-shadow text-center lg:pt-48">
            {onEmptyText}
          </Heading>
        )}
      </div>
      <div className="flex flex-row flex-wrap justify-end p-2 lg:p-0">
        <IngredientPrice
          value={totalPrice}
          digitsSize="large"
          className="mr-5"
        />
        <OrderButton />
      </div>
    </>
  );
};
