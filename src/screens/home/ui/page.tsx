import { CONSTANTS_MAP } from "~/shared/constants";
import { Heading } from "~/shared/ui";
import { ConstructorContainer } from "./constructor";
import { IngredientContainer } from "./ingredients";
import { DNDProvider } from "../providers/DNDProvider";

export const HomePage: React.FC = () => {
  const { mainText } = CONSTANTS_MAP.pages.home;
  return (
    <DNDProvider>
      <Heading className="text-center lg:text-left">{mainText}</Heading>
      <div className="flex flex-row flex-wrap lg:gap-10 lg:flex-nowrap">
        <div className="flex flex-col w-full lg:basis-1/2">
          <IngredientContainer />
        </div>
        <div className="flex flex-col justify-between w-full lg:basis-1/2 lg:pt-10">
          <ConstructorContainer />
        </div>
      </div>
    </DNDProvider>
  );
};
