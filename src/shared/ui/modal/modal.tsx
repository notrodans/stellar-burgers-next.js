"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { CONSTANTS_MAP, ICONS_MAP } from "~/shared/constants";
import { cn } from "~/shared/lib/css";
import { ModalProps } from "./types";

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ className, children, onClose, heading, ...props }, ref) => {
    const { modalCloseKey } = CONSTANTS_MAP.shared.config;

    useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === modalCloseKey) {
          onClose();
        }
      }
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [onClose, modalCloseKey]);

    const modal = (
      <div
        className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-dark bg-opacity-75 cursor-pointer overflow-hidden"
        onClick={onClose}
      >
        <div
          className={cn(
            "relative border-2 border-accent rounded-3xl shadow-inner w-full h-full lg:h-fit lg:w-[600px] bg-dark p-10 cursor-auto",
            className,
          )}
          ref={ref}
          {...props}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={cn(
              "flex flex-row items-center pb-10",
              heading ? "justify-between" : "justify-end",
            )}
          >
            {heading && <p className="text-2xl font-bold">{heading}</p>}
            <button data-cy="close-modal" onClick={onClose}>
              <ICONS_MAP.CloseIcon />
            </button>
          </div>
          {children}
        </div>
      </div>
    );

    return createPortal(modal, document.getElementById("modals")!);
  },
);

Modal.displayName = "Modal";
