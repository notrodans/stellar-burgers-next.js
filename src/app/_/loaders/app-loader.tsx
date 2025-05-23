"use client";

import { useEffect, useState } from "react";
import { preload } from "swr";
import { getAuthUser, getGetAuthUserKey } from "~/shared/api/private-generated";
import {
  getGetIngredientsKey,
  getIngredients,
} from "~/shared/api/public-generated";
import { Loader } from "~/shared/ui";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";

export function AppLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useApplayAppInterceptor();

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      preload(getGetIngredientsKey, getIngredients),
      preload(getGetAuthUserKey, getAuthUser),
    ])
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => ({}));
  }, []);

  if (isLoading) {
    return <Loader screen />;
  }

  return <>{children}</>;
}
