import { CONSTANTS_MAP, ICONS_MAP } from "~/shared/constants";
import { Paragraph } from "~/shared/ui";
import { OrderModalProps } from "../model";

export const OrderModalContent: React.FC<OrderModalProps> = ({
  name,
  order,
}) => {
  const { mainText, inactiveText, iconSize } =
    CONSTANTS_MAP.entities.order.modal;
  return (
    <div className="flex flex-col text-center justify-center items-center gap-4 lg:gap-8">
      <Paragraph size="heading" className="text-shadow">
        {order.number}
      </Paragraph>
      <Paragraph>{name}</Paragraph>
      <ICONS_MAP.TickIcon size={iconSize} />
      <div>
        <Paragraph>{mainText}</Paragraph>
        <Paragraph variant="inactive">{inactiveText}</Paragraph>
      </div>
    </div>
  );
};
