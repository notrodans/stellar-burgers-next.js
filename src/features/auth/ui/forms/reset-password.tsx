"use client";

import { PasswordInput } from "~/entities/user";
import { cn, getApiError, useForm } from "~/shared/lib";
import { CONSTANTS_MAP } from "~/shared/constants";
import { Input, Button, Alert } from "~/shared/ui";
import { PasswordWithToken } from "~/shared/api/generated";
import { useResetPassword } from "../../model/use-reset-password";

const initialData: PasswordWithToken = {
  password: "",
  token: "",
};

export const ResetPasswordForm: React.FC = () => {
  const { resetButton, errorHeadingText } =
    CONSTANTS_MAP.features.auth.resetPassword;
  const { mutate, isLoading, error } = useResetPassword();
  const { values, handleChange } = useForm(initialData);
  const handleSubmit = (e: React.FormEvent) => {
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
