"use client";

import { Loader } from "~/shared/ui";
import { Session, SessionProvider } from "~/entities/session";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";
import { useIngredients } from "~/entities/ingredient";
import { useUser } from "~/entities/user";
import {
  ApiError,
  useGetAuthUser,
  useGetIngredients,
} from "~/shared/api/generated";

export function AppLoader({
  data,
  children,
}: {
  data: { session: Session | undefined };
  children: React.ReactNode;
}) {
  const setIngredients = useIngredients((s) => s.setIngredients);
  const setCurrentUser = useUser((s) => s.setCurrentUser);
  const session = data.session;

  const { isLoading: isIngredientsLoading } = useGetIngredients<ApiError>({
    swr: {
      onSuccess({ data }) {
        setIngredients(data);
      },
    },
    request: {
      headers: {
        Authorization: session?.accessToken,
      },
    },
  });

  const { isLoading: isUserLoading } = useGetAuthUser<ApiError>({
    swr: {
      onSuccess({ user }) {
        setCurrentUser(user);
      },
    },
    request: {
      headers: {
        Authorization: session?.accessToken,
      },
    },
  });

  useApplayAppInterceptor({ session });

  const isDataFetching = isUserLoading || isIngredientsLoading;

  return (
    <>
      {isDataFetching && <Loader screen />}
      {!isDataFetching ? (
        <SessionProvider value={{ session }}>{children}</SessionProvider>
      ) : null}
    </>
  );
}
