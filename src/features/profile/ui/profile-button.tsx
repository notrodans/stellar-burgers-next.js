"use client";

import { useGetAuthUser } from "~/shared/api/private-generated";
import { CONSTANTS_MAP, ROUTER_PATHS } from "~/shared/constants";
import { NavigationLink } from "~/shared/ui";

export const ProfileButton: React.FC = () => {
  const { data } = useGetAuthUser();
  const { loginLink, profileLink } = CONSTANTS_MAP.features.auth.login;

  if (!data) {
    return (
      <NavigationLink to={ROUTER_PATHS.SIGN_IN} icon="LoginIcon">
        {loginLink}
      </NavigationLink>
    );
  }

  return (
    <NavigationLink to={ROUTER_PATHS.PROFILE} icon="ProfileIcon">
      {profileLink}
    </NavigationLink>
  );
};
