import { ICONS_MAP } from "~/shared/constants";
import { cn } from "~/shared/lib/css";

import { forwardRef } from "react";
import type { InputProps } from "./types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, errorText, onIconClick, ...props }, ref) => {
    const IconComponent = icon && ICONS_MAP[icon];
    return (
      <div className={className}>
        <div className="flex items-center justify-end">
          <input
            type={type}
            className={cn(
              "rounded-full bg-night px-8 py-5 lg:min-w-[28rem] outline-none placeholder:text-inactive duration-500 disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-2 border-error"
                : "border-none focus:ring-2 focus:ring-accent",
            )}
            ref={ref}
            {...props}
          />
          {IconComponent && (
            <IconComponent
              className="absolute mr-2 w-10 cursor-pointer"
              onClick={onIconClick}
            />
          )}
        </div>
        {error && <p className="text-error text-sm mt-1 ml-2">{errorText}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
