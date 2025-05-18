import type { VariantProps } from "class-variance-authority";
import { alertVariants } from "./variants";
import type { HTMLAttributes } from "react";

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
