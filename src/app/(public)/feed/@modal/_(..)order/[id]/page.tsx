"use client";

import { useRouter } from "next/navigation";
import { OrderPage } from "~/screens/order";
import { CONSTANTS_MAP } from "~/shared/constants";
import { Modal } from "~/shared/ui";

export default function ModalFeedOrderPage() {
  const router = useRouter();
  return (
    <Modal
      heading={CONSTANTS_MAP.entities.order.modal.headingText}
      onClose={() => {
        router.back();
      }}
    >
      <div>HEHEHEH</div>
    </Modal>
  );
}
