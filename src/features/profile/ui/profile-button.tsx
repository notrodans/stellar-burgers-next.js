"use client";

import { CONSTANTS_MAP, ROUTER_PATHS } from "~/shared/constants";
import { NavigationLink } from "~/shared/ui";

export const ProfileButton: React.FC = () => {
  const { profileLink } = CONSTANTS_MAP.features.auth.login;

  return (
    <NavigationLink to={ROUTER_PATHS.PROFILE} icon="ProfileIcon">
      {profileLink}
    </NavigationLink>
  );
};
