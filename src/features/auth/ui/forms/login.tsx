"use client";

import { useState } from "react";
import { CONSTANTS_MAP } from "~/shared/constants";
import { useForm } from "~/shared/lib";
import { cn } from "~/shared/lib/css";
import { getApiError } from "~/shared/lib/utils";
import { Alert, Button, Input } from "~/shared/ui";
import { useUserSignIn } from "../../model/use-user-sign-in";
import { PasswordInput } from "../password-input";

const initialState = {
  email: "",
  password: "",
};

export const LoginForm: React.FC = () => {
  const { loginButton, errorHeadingText } = CONSTANTS_MAP.features.auth.login;
  const [isAlertHide, setIsAlertHide] = useState<boolean>(false);
  const { trigger, error, isLoading } = useUserSignIn();

  const { values, handleChange } = useForm(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trigger(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col items-center gap-2 lg:gap-5",
        isLoading && "animate-pulse",
      )}
    >
      {!isAlertHide && error && (
        <Alert
          onButtonClick={() => setIsAlertHide(true)}
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
        autoComplete="email"
        placeholder="E-mail"
      />
      <PasswordInput onChange={handleChange} value={values.password} />

      <Button type="submit" disabled={isLoading}>
        {loginButton}
      </Button>
    </form>
  );
};
