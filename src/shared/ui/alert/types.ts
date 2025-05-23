import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { alertVariants } from "./variants";

export type IconName = "ErrorIcon" | "TickIcon";

type BaseProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    heading?: string;
    text: string;
  };

export type AlertProps = BaseProps &
  (
    | {
        icon: IconName;
        onButtonClick: (() => void) | undefined;
      }
    | {
        icon?: undefined;
      }
  );
