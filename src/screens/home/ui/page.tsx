import { GetIngredients200 } from "~/shared/api/public-generated";
import { CONSTANTS_MAP } from "~/shared/constants";
import { Heading } from "~/shared/ui";
import { DNDProvider } from "../providers/DNDProvider";
import { ConstructorContainer } from "./constructor";
import { IngredientContainer } from "./ingredients";

async function getIngredients() {
  const res = await fetch(process.env.BASE_API_URL + "/api/ingredients", {
    method: "get",
  });
  const data = (await res.json()) as GetIngredients200;
  return data.data;
}

export async function HomePage() {
  const ingredients = await getIngredients();
  const { mainText } = CONSTANTS_MAP.pages.home;
  return (
    <DNDProvider>
      <Heading className="text-center lg:text-left">{mainText}</Heading>
      <div className="grow flex flex-row flex-wrap lg:gap-10 lg:flex-nowrap">
        <div className="flex flex-col w-full lg:basis-1/2">
          <IngredientContainer ingredients={ingredients} />
        </div>
        <div className="flex flex-col justify-between w-full lg:basis-1/2 lg:pt-10">
          <ConstructorContainer />
        </div>
      </div>
    </DNDProvider>
  );
}
