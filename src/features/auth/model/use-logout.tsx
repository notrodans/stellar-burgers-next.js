"use client";

import { useCallback, useState } from "react";
import { useSession } from "~/entities/session";

export function useLogout() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const removeSession = useSession((s) => s.removeSession);

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
