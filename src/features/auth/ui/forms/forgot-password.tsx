"use client";

import { cn, getApiError, useForm } from "~/shared/lib";
import { CONSTANTS_MAP } from "~/shared/constants";
import { Input, Button, Alert } from "~/shared/ui";
import { useForgotPassword } from "../../model";

const initialData = {
  email: "",
};

export const ForgotPasswordForm: React.FC = () => {
  const { continueButton, errorHeadingText } =
    CONSTANTS_MAP.features.auth.forgotPassword;
  const { mutate, isLoading, error } = useForgotPassword();
  const { values, handleChange } = useForm(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <form
      className={cn(
        "flex flex-col items-center gap-2 lg:gap-5",
        isLoading && "animate-pulse",
      )}
      onSubmit={handleSubmit}
    >
      {error && (
        <Alert
          onButtonClick={undefined}
          variant="error"
          icon="ErrorIcon"
          heading={errorHeadingText}
          text={getApiError(error)}
        />
      )}
      <Input
        onChange={handleChange}
        value={values.email}
        type="email"
        name="email"
        placeholder="Укажите E-mail"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {continueButton}
      </Button>
    </form>
  );
};
