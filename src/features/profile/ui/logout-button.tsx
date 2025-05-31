"use client";

import { CONSTANTS_MAP } from "~/shared/constants";

import useSWR from "swr";
import { getSession } from "~/shared/model";
import { Button } from "~/shared/ui";
import { useUserLogout } from "../model";

export const LogoutButton: React.FC = () => {
  const { data: session } = useSWR("session", getSession);
  const { logoutButton, loadingText } = CONSTANTS_MAP.features.auth.logout;
  const { trigger, isLoading } = useUserLogout();

  return (
    <Button
      type="button"
      onClick={() => trigger({ token: session!.refreshToken })}
      disabled={isLoading}
      variant="link"
      className="justify-start hover:transition-none cursor-pointer hover:scale-100 duration-0 p-0 text-xl"
    >
      {isLoading ? loadingText : logoutButton}
    </Button>
  );
};
