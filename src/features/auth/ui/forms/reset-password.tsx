"use client";

import { CONSTANTS_MAP } from "~/shared/constants";
import { cn, getApiError, useForm } from "~/shared/lib";
import { Alert, Button, Input } from "~/shared/ui";
import { useResetPassword } from "../../model/use-reset-password";
import { PasswordInput } from "../password-input";

const initialData = {
  password: "",
  token: "",
};

export const ResetPasswordForm: React.FC = () => {
  const { resetButton, errorHeadingText } =
    CONSTANTS_MAP.features.auth.resetPassword;
  const { trigger, isLoading, error } = useResetPassword();
  const { values, handleChange } = useForm(initialData);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trigger(values);
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
      <PasswordInput
        value={values.password}
        onChange={handleChange}
        disabled={isLoading}
        placeholder="Введите новый пароль"
      />
      <Input
        value={values.token}
        type="text"
        name="token"
        placeholder="Введите код из письма"
        onChange={handleChange}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {resetButton}
      </Button>
    </form>
  );
};
