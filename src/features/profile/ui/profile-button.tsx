"use client";

import { useGetAuthUser } from "~/shared/api/private-generated";
import { CONSTANTS_MAP, ROUTER_PATHS } from "~/shared/constants";
import { NavigationLink } from "~/shared/ui";

export const ProfileButton: React.FC = () => {
  const { data: session, isLoading } = useGetAuthUser();
  const { loginLink, profileLink } = CONSTANTS_MAP.features.auth.login;

  if (isLoading) return <p>Загрузка профиля...</p>;

  if (!session) {
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
