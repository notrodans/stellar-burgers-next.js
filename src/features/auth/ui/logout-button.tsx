import { useSession } from "~/entities/session";
import { CONSTANTS_MAP } from "~/shared/constants";

import { Button } from "~/shared/ui";
import { useLogout } from "../model/use-logout";

export const LogoutButton: React.FC = () => {
  const session = useSession((s) => s.currentSession);
  const { logoutButton, loadingText } = CONSTANTS_MAP.features.auth.logout;
  const { isLoading, logout } = useLogout();

  return (
    <Button
      type="button"
      onClick={async () => {
        if (!session) return;
        await logout();
      }}
      disabled={isLoading}
      variant="link"
      className="justify-start hover:transition-none cursor-pointer hover:scale-100 duration-0 p-0 text-xl"
    >
      {isLoading ? loadingText : logoutButton}
    </Button>
  );
};
