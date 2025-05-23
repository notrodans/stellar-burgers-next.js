import Image from "next/image";
import { Paragraph } from "~/shared/ui";
import { IngredientProps } from "../../model";
import { IngredientPrice } from "../price";

export const IngredientComponent: React.FC<IngredientProps> = ({
  _id,
  name,
  image,
  price,
  counterSlot,
  removeSlot,
  addSlot,
  dragRef,
}) => {
  return (
    <div
      data-cy={_id}
      className="relative basis-2/5 lg:hover:scale-110 lg:duration-500"
      /* @ts-expect-error bad type */
      ref={dragRef}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        {counterSlot}
        <Image width={229} height={114} src={image} alt={name} />
        <IngredientPrice value={price} />
        <Paragraph size="small" className="text-center">
          {name}
        </Paragraph>
      </div>
      <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:flex-nowrap justify-center pt-2 lg:hidden">
        {removeSlot}
        {addSlot}
      </div>
    </div>
  );
};
