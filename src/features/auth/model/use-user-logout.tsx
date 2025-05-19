"use client";

import { useCallback, useState } from "react";
import { useSession } from "~/entities/session";

export function useUserLogout() {
  const removeSession = useSession((s) => s.removeSession);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = useCallback(async () => {
    setIsLoading(true);
    await removeSession().finally(() => {
      setIsLoading(false);
    });
  }, [removeSession]);

  return {
    isLoading,
    logout,
  };
}
