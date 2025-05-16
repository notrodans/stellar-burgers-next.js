// import { useRef, memo } from "react";
// import { useConstructorDND } from "~/features/constructor/move";
// import { DesktopButtonRemove } from "~/features/constructor/remove";
// import { MoveIcon } from "~/entities/constructor";
// import { IngredientPrice, ConstructorIngredient } from "~/entities/ingredient";
// import { ICONS_MAP } from "~/shared/constants";
// import type { ConstructorElementProps } from "../model";
//
// const ConstructorElement: React.FC<ConstructorElementProps> = ({
//   name,
//   _id,
//   price,
//   image,
//   type,
//   index,
//   positionClassName,
// }) => {
//   const ref = useRef(null);
//   const { dragRef, dropTarget } = useConstructorDND(index);
//   dragRef(dropTarget(ref));
//   return (
//     <ConstructorIngredient
//       _id={_id}
//       name={name}
//       image={image}
//       priceSlot={<IngredientPrice value={price} className="mr-5" />}
//       actionSlot={
//         type === "bun" ? (
//           <ICONS_MAP.LockedIcon className="text-inactive inline-flex items-center ml-5" />
//         ) : (
//           <DesktopButtonRemove index={index} />
//         )
//       }
//       dragRef={type === "bun" ? undefined : ref}
//       dragSlot={type === "bun" ? undefined : <MoveIcon />}
//       className={positionClassName}
//     />
//   );
// };
//
// export const MemoizedConstructorElement = memo(ConstructorElement);
