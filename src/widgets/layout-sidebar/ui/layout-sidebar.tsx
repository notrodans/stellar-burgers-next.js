import { LogoutButton } from "~/features/profile";
import { CONSTANTS_MAP, ROUTER_PATHS } from "~/shared/constants";
import { NavigationLink, Paragraph } from "~/shared/ui";

export const LayoutSidebar: React.FC = () => {
  const { mainLink, ordersLink, footerText } =
    CONSTANTS_MAP.widgets.layoutSidebar;
  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 lg:flex-col lg:gap-8">
      <NavigationLink to={ROUTER_PATHS.PROFILE} className="text-xl">
        {mainLink}
      </NavigationLink>
      <NavigationLink to={ROUTER_PATHS.PROFILE_ORDERS} className="text-xl">
        {ordersLink}
      </NavigationLink>
      <LogoutButton />
      <Paragraph variant="inactive" className="hidden lg:block lg:pt-10">
        {footerText}
      </Paragraph>
    </div>
  );
};
