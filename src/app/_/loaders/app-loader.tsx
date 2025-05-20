"use client";

import { Loader } from "~/shared/ui";
import { Session, SessionProvider } from "~/entities/session";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";
import { useIngredients } from "~/entities/ingredient";
import { useUser } from "~/entities/user";
import { useGetIngredients } from "~/shared/api/public-generated";
import { useGetAuthUser } from "~/shared/api/private-generated";
import { ApiError } from "~/shared/api";

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

  useApplayAppInterceptor({ session });

  const { isLoading: isIngredientsLoading } = useGetIngredients<ApiError>({
    swr: {
      onSuccess({ data }) {
        setIngredients(data);
      },
    },
  });

  const { isLoading: isUserLoading } = useGetAuthUser<ApiError>({
    swr: {
      onSuccess({ user }) {
        setCurrentUser(user);
      },
    },
  });

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
