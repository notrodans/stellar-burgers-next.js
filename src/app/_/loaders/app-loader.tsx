"use client";

import { useEffect, useState } from "react";
import { api } from "~/shared/api";
import { Loader } from "~/shared/ui";
import { User, UserProvider } from "~/entities/user";
import { Session, SessionProvider } from "~/entities/session";
import { IngredientObject, IngredientsProvider } from "~/entities/ingredient";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";

export function AppLoader({
  data: { session },
  children,
}: {
  data: { session: Session | undefined };
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [ingredients, setIngredients] = useState<IngredientObject[]>([]);
  const [isIngredientsLoading, setIsIngredientsLoading] =
    useState<boolean>(true);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

  useApplayAppInterceptor({ session });

  useEffect(() => {
    const token = session?.accessToken;
    if (!token) return setIsUserLoading(false);

    api
      .getAuthUser({
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setUser(res.user);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }, [session]);

  useEffect(() => {
    api
      .getIngredients()
      .then(({ data }) => {
        setIngredients(data);
      })
      .finally(() => {
        setIsIngredientsLoading(false);
      });
  }, []);

  const isDataFetching = isUserLoading || isIngredientsLoading;

  return (
    <>
      {isDataFetching && <Loader screen />}
      {!isDataFetching ? (
        <SessionProvider value={{ session }}>
          <UserProvider value={{ user }}>
            <IngredientsProvider value={{ ingredients }}>
              {children}
            </IngredientsProvider>
          </UserProvider>
        </SessionProvider>
      ) : null}
    </>
  );
}
