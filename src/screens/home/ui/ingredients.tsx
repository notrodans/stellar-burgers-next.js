"use client";

import { useRef } from "react";
import { IngredientDetails } from "~/widgets/ingredient-card";
import { IngredientTabs } from "~/widgets/ingredient-tabs";
import {
  type IngredientType,
  createIngredientSections,
  useIngredients,
} from "~/entities/ingredient";
import { Paragraph, ScrollArea } from "~/shared/ui";
import { CONSTANTS_MAP } from "~/shared/constants";

export const IngredientContainer: React.FC = () => {
  const { types } = CONSTANTS_MAP.entities.ingredient;
  const tabsConnectionRef = useRef<HTMLDivElement>(null);
  const ingredients = useIngredients((s) => s.ingredients);

  return (
    <>
      <IngredientTabs containerRef={tabsConnectionRef} />
      <ScrollArea
        ref={tabsConnectionRef}
        size="medium"
        className="px-2 lg:px-0"
      >
        {ingredients &&
          createIngredientSections(ingredients).map(([type, ingredients]) => (
            <section id={type} key={type}>
              <Paragraph size="medium" weight="bold">
                {types[type as IngredientType]}
              </Paragraph>
              <div className="flex flex-row flex-wrap gap-6 ml-4 my-6">
                {ingredients.map((item) => (
                  <IngredientDetails
                    key={item._id}
                    _id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    type={item.type}
                  />
                ))}
              </div>
            </section>
          ))}
      </ScrollArea>
    </>
  );
};
