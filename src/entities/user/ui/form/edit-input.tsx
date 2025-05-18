"use client";

import { forwardRef, useState } from "react";
import { Input } from "~/shared/ui";
import { CustomInputProps } from "../../model/types";

export const EditInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ ...props }, ref) => {
    const [isEditable, setIsEditable] = useState(false);
    return (
      <Input
        ref={ref}
        icon="EditIcon"
        onIconClick={() => setIsEditable(true)}
        onBlur={() => setIsEditable(false)}
        disabled={!isEditable}
        {...props}
      />
    );
  },
);

EditInput.displayName = "EditInput";
