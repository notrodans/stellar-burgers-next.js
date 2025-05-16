import React from "react";
import { cn } from "~/shared/lib/css";
import { ICONS_MAP } from "~/shared/constants";
import { Paragraph } from "~/shared/ui";
import { AlertProps } from "./types";
import { alertVariants } from "./variants";

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ heading, text, icon, className, variant, ...props }, ref) => {
    const IconComponent = icon && ICONS_MAP[icon];
    const handleButtonClick =
      icon && "onButtonClick" in props ? props.onButtonClick : undefined;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {IconComponent && handleButtonClick ? (
          <button type="button" onClick={handleButtonClick}>
            <IconComponent />
          </button>
        ) : null}
        <Paragraph>{heading}</Paragraph>
        <Paragraph size="small" className="mt-2">
          {text}
        </Paragraph>
      </div>
    );
  },
);

Alert.displayName = "Alert";
