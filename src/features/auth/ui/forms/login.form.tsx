"use client";

import { PasswordInput } from "~/entities/user";
import { cn } from "~/shared/lib/css";
import { CONSTANTS_MAP } from "~/shared/constants";
import { Input, Button, Alert } from "~/shared/ui";
import { api } from "~/shared/api";
import { useSession } from "~/entities/session";
import { getApiError } from "~/shared/lib/utils";
import { startTransition, useActionState, useCallback, useState } from "react";
import { ApiError, LoginFormDataDto } from "~/shared/api/generated";
import { useRouter } from "next/navigation";

type InitialState = LoginFormDataDto & {
  error: null | ApiError;
};

const initialState: InitialState = {
  email: "",
  password: "",
  error: null,
};

export const LoginForm: React.FC = () => {
  const setCurrentSession = useSession((s) => s.setCurrentSession);
  const [isAlertHide, setIsAlertHide] = useState<boolean>(false);
  const { loginButton, errorHeadingText } = CONSTANTS_MAP.features.auth.login;
  const router = useRouter();

  const fetchFn = useCallback(
    async (initialState: InitialState, formData: FormData) => {
      return api
        .postAuthLogin({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        })
        .then(async (res) => {
          await setCurrentSession({
            ...res.user,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
          return {
            ...initialState,
            error: null,
          };
        })
        .catch((err) => {
          setIsAlertHide(false);
          return {
            ...initialState,
            error: err as ApiError,
          };
        })
        .finally(() => {
          router.push("/");
        });
    },
    [setCurrentSession, router],
  );

  const [state, formAction, isLoading] = useActionState(fetchFn, initialState);

  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        setIsAlertHide(true);

        startTransition(() => {
          formAction(new FormData(e.currentTarget as HTMLFormElement));
        });
      }}
      className={cn(
        "flex flex-col items-center gap-2 lg:gap-5",
        isLoading && "animate-pulse",
      )}
    >
      {!isAlertHide && state?.error && (
        <Alert
          onButtonClick={() => setIsAlertHide(true)}
          variant="error"
          icon="ErrorIcon"
          heading={errorHeadingText}
          text={getApiError(state.error)}
        />
      )}
      <Input
        type="email"
        name="email"
        autoComplete="email"
        placeholder="E-mail"
      />
      <PasswordInput />

      <Button type="submit" disabled={isLoading}>
        {loginButton}
      </Button>
    </form>
  );
};
