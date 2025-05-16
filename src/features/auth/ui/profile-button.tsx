import { useSession } from "~/entities/session";
import { CONSTANTS_MAP, ROUTER_PATHS } from "~/shared/constants";
import { NavigationLink } from "~/shared/ui";

export const ProfileButton: React.FC = () => {
  const session = useSession((s) => s.currentSession);
  const { loginLink, profileLink } = CONSTANTS_MAP.features.auth.login;

  if (!!session) {
    return (
      <NavigationLink to={ROUTER_PATHS.PROFILE} icon="ProfileIcon">
        {profileLink}
      </NavigationLink>
    );
  }

  return (
    <NavigationLink to={ROUTER_PATHS.SIGN_IN} icon="LoginIcon">
      {loginLink}
    </NavigationLink>
  );
};
