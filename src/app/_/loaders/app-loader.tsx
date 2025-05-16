"use client";

import { useEffect, useState } from "react";
import { IngredientObject, IngredientsProvider } from "~/entities/ingredient";
import { Session, SessionProvider } from "~/entities/session";
import { api } from "~/shared/api";
import { Loader } from "~/shared/ui";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";

export function AppLoader({
  data,
  children,
}: {
  data: { session?: Session | undefined };
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | undefined>(data?.session);
  const [ingredients, setIngredients] = useState<IngredientObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isData = !!data?.session;

  useApplayAppInterceptor();

  useEffect(() => {
    if (!isData) return;

    setIsLoading(true);

    const getIngredients = api.getIngredients.bind(null);
    const getAuthUser = api.getAuthUser.bind(null, {
      headers: {
        Authorization: `${session?.accessToken}`,
      },
    });

    Promise.all([getIngredients(), getAuthUser()])
      .then(([{ data }, { user }]) => {
        setSession((prev) => {
          if (!prev) return;
          return {
            ...prev,
            ...user,
          };
        });
        setIngredients(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isData, session?.accessToken]);

  return (
    <>
      {isLoading && <Loader screen />}
      {!isLoading ? (
        <SessionProvider value={{ session }}>
          <IngredientsProvider value={{ ingredients }}>
            {children}
          </IngredientsProvider>
        </SessionProvider>
      ) : null}
    </>
  );
}
