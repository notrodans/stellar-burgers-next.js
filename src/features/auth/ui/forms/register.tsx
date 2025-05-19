"use client";

import { PasswordInput } from "~/entities/user";
import { cn, getApiError, useForm } from "~/shared/lib";
import { CONSTANTS_MAP } from "~/shared/constants";
import { Input, Button, Alert } from "~/shared/ui";
import { UserObjectWithPasswordDto } from "~/shared/api/generated";
import { useUserRegister } from "../../model";

const initialData: UserObjectWithPasswordDto = {
  email: "",
  name: "",
  password: "",
};

export const RegisterForm: React.FC = () => {
  const { registerButton, errorHeadingText } =
    CONSTANTS_MAP.features.auth.register;
  const { mutate, isLoading, error } = useUserRegister();
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
      <Input
        value={values.name}
        type="text"
        name="name"
        placeholder="Имя"
        onChange={handleChange}
        disabled={isLoading}
      />
      <Input
        value={values.email}
        type="email"
        name="email"
        placeholder="E-mail"
        onChange={handleChange}
        disabled={isLoading}
      />
      <PasswordInput
        value={values.password}
        onChange={handleChange}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {registerButton}
      </Button>
    </form>
  );
};
