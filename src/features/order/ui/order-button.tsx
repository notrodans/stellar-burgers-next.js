"use client";

import { useState } from "react";
import { useConstructor } from "~/entities/constructor";
import { OrderModalContent } from "~/entities/order";
import { CONSTANTS_MAP } from "~/shared/constants";
import { getApiError } from "~/shared/lib";
import { Button, Loader, Modal, Paragraph } from "~/shared/ui";
import { useCreateOrder, useOrderDetails } from "../model";

export const OrderButton: React.FC = () => {
  const { orderButton } = CONSTANTS_MAP.features.order;
  const { loadingText } = CONSTANTS_MAP.entities.order.modal;

  const [showModal, setShowModal] = useState(false);

  const clearConstructor = useConstructor((s) => s.clearConstructor);

  const { isOrderable, ingredientIds } = useOrderDetails();
  const { trigger, data, isLoading, error } = useCreateOrder();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    trigger({ ingredients: ingredientIds }).then(() => {
      clearConstructor();
      setShowModal(true);
    });
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={!isOrderable || isLoading}
        variant={isLoading ? "loading" : "default"}
      >
        {orderButton}
      </Button>
      {showModal && (
        <Modal
          onClose={() => {
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
