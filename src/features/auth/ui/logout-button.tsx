"use client";

import { CONSTANTS_MAP } from "~/shared/constants";

import { Button } from "~/shared/ui";
import { useUserLogout } from "../model/use-user-logout";

export const LogoutButton: React.FC = () => {
  const { logoutButton, loadingText } = CONSTANTS_MAP.features.auth.logout;
  const { logout, isLoading } = useUserLogout();

  return (
    <Button
      type="button"
      onClick={logout}
      disabled={isLoading}
      variant="link"
      className="justify-start hover:transition-none cursor-pointer hover:scale-100 duration-0 p-0 text-xl"
    >
      {isLoading ? loadingText : logoutButton}
    </Button>
  );
};
