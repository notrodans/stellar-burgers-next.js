"use client";

import { useSession } from "~/entities/session";
import { CONSTANTS_MAP } from "~/shared/constants";
import { cn, getApiError, useForm } from "~/shared/lib";
import { Alert, Button, Input, Paragraph } from "~/shared/ui";
import { useUserUpdate } from "../../model";

type InitialState = {
  name: string;
  email: string;
  password: string;
};

export const SettingsForm: React.FC = () => {
  const content = CONSTANTS_MAP.features.auth.profile;
  const { currentSession } = useSession();
  const { trigger, error, isLoading, isSuccess } = useUserUpdate();

  const initialState: InitialState = {
    name: currentSession?.name ?? "",
    email: currentSession?.email ?? "",
    password: "**********",
  };

  const { values, handleChange } = useForm(initialState);
  const isDataHasChanges =
    JSON.stringify(initialState) !== JSON.stringify(values);

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
      {error && (
        <Alert
          onButtonClick={undefined}
          variant="error"
          icon="ErrorIcon"
          heading={content.errorHeadingText}
          text={getApiError(error)}
        />
      )}
      {isLoading && <Paragraph>{content.loadingText}</Paragraph>}
      {isSuccess && (
        <Alert
          onButtonClick={undefined}
          variant="success"
          icon="TickIcon"
          text={content.successText}
        />
      )}
      <Input
        value={values.name}
        onChange={handleChange}
        disabled={isLoading}
        type="text"
        name="name"
        placeholder="Имя"
      />
      <Input
        value={values.email}
        onChange={handleChange}
        disabled={isLoading}
        type="email"
        name="email"
        placeholder="E-mail"
      />
      <Input
        value={values.password}
        onChange={handleChange}
        disabled={isLoading}
        type="password"
        name="password"
        placeholder="Пароль"
      />
      {isDataHasChanges && (
        <Button type="submit">{content.changeButton}</Button>
      )}
    </form>
  );
};
