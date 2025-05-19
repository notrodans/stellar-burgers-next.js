"use client";

import { EditInput, useUser } from "~/entities/user";
import { cn, getApiError, useForm } from "~/shared/lib";
import { CONSTANTS_MAP } from "~/shared/constants";
import { Alert, Button, Paragraph } from "~/shared/ui";
import { useUserUpdate } from "../../model";

type InitialState = {
  name: string;
  email: string;
  password: string;
};

export const SettingsForm: React.FC = () => {
  const currentUser = useUser((s) => s.currentUser);
  const content = CONSTANTS_MAP.features.auth.profile;
  const { mutate, data, error, isLoading, isSuccess } = useUserUpdate();

  const initialState: InitialState = {
    name: currentUser?.name ?? "",
    email: currentUser?.email ?? "",
    password: "**********",
    ...data,
  };

  const { values, handleChange } = useForm(initialState);
  const isDataHasChanges =
    JSON.stringify(initialState) !== JSON.stringify(values);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(values);
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
      <EditInput
        value={values.name}
        onChange={handleChange}
        type="text"
        name="name"
        placeholder="Имя"
      />
      <EditInput
        value={values.email}
        onChange={handleChange}
        type="email"
        name="email"
        placeholder="E-mail"
      />
      <EditInput
        value={values.password}
        onChange={handleChange}
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
