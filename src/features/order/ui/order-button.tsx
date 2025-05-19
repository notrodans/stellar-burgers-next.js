"use client";

import { useState } from "react";
import { cn, getApiError } from "~/shared/lib";
import { CONSTANTS_MAP, ROUTER_PATHS } from "~/shared/constants";
import { Button, Loader, Modal, Paragraph } from "~/shared/ui";
import { useOrderDetails } from "../model/use-order-details";
import { useRouter } from "next/navigation";
import { useUser } from "~/entities/user";
import { useConstructor } from "~/entities/constructor";
import { useCreateOrder } from "../model";
import { OrderModalContent } from "~/entities/order";

export const OrderButton: React.FC = () => {
  const { orderButton } = CONSTANTS_MAP.features.order;
  const { loadingText } = CONSTANTS_MAP.entities.order.modal;

  const [showModal, setShowModal] = useState(false);

  const currentUser = useUser((s) => s.currentUser);
  const clearConstructor = useConstructor((s) => s.clearConstructor);

  const { isOrderable, ingredientIds } = useOrderDetails();
  const { trigger: mutate, data, isLoading, error } = useCreateOrder();

  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({ ingredients: ingredientIds }).then(() => setShowModal(true));
  };

  return (
    <>
      <Button
        onClick={
          currentUser ? handleClick : () => router.push(ROUTER_PATHS.SIGN_IN)
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
