"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useConstructor } from "~/entities/constructor";
import { OrderModalContent } from "~/entities/order";
import { useGetAuthUser } from "~/shared/api/private-generated";
import { CONSTANTS_MAP, ROUTER_PATHS } from "~/shared/constants";
import { cn, getApiError } from "~/shared/lib";
import { Button, Loader, Modal, Paragraph } from "~/shared/ui";
import { useCreateOrder, useOrderDetails } from "../model";

export const OrderButton: React.FC = () => {
  const { orderButton } = CONSTANTS_MAP.features.order;
  const { loadingText } = CONSTANTS_MAP.entities.order.modal;

  const [showModal, setShowModal] = useState(false);

  const { data: currentUser } = useGetAuthUser();
  const clearConstructor = useConstructor((s) => s.clearConstructor);

  const { isOrderable, ingredientIds } = useOrderDetails();
  const { trigger, data, isLoading, error } = useCreateOrder();

  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await trigger({ ingredients: ingredientIds });
    setShowModal(true);
  };

  return (
    <>
      <Button
        onClick={
          currentUser ? handleClick : () => router.replace(ROUTER_PATHS.SIGN_IN)
        }
        disabled={!isOrderable || isLoading}
        className={cn(isLoading && "animate-pulse")}
      >
        {orderButton}
      </Button>
      {showModal && (
        <Modal
          onClose={() => {
            clearConstructor();
            setShowModal(false);
          }}
        >
          {isLoading && (
            <div className="flex flex-col gap-2 items-center">
              <Loader />
              <Paragraph className="animate-pulse">{loadingText}</Paragraph>
            </div>
          )}
          {error && <Paragraph variant="error">{getApiError(error)}</Paragraph>}
          {data && <OrderModalContent name={data.name} order={data.order} />}
        </Modal>
      )}
    </>
  );
};
