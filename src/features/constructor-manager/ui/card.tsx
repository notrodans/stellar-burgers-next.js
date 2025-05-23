"use client";

import { memo, useRef } from "react";
import { MoveIcon } from "~/entities/constructor";
import { ConstructorIngredient, IngredientPrice } from "~/entities/ingredient";
import { ICONS_MAP } from "~/shared/constants";
import { ConstructorElementProps, useConstructorDND } from "../model";
import { DesktopButtonRemove } from "./remove-button";

const ConstructorElement: React.FC<ConstructorElementProps> = ({
  name,
  _id,
  price,
  image,
  type,
  index,
  positionClassName,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { dragRef, dropTarget } = useConstructorDND(index);
  dragRef(dropTarget(ref));
  return (
    <ConstructorIngredient
      _id={_id}
      name={name}
      image={image}
      priceSlot={<IngredientPrice value={price} className="mr-5" />}
      actionSlot={
        type === "bun" ? (
          <ICONS_MAP.LockedIcon className="text-inactive inline-flex items-center ml-5" />
        ) : (
          <DesktopButtonRemove index={index} />
        )
      }
      dragRef={type === "bun" ? undefined : ref}
      dragSlot={type === "bun" ? undefined : <MoveIcon />}
      className={positionClassName}
    />
  );
};
export const MemoizedConstructorElement = memo(ConstructorElement);
