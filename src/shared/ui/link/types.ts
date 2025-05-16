import { LinkProps } from "next/link";

export interface NavigationLinkProps extends Omit<LinkProps, "href"> {
  to: string;
  children: React.ReactNode;
  className?: string;
  icon?: "FeedIcon" | "BurgerIcon" | "ProfileIcon" | "LoginIcon";
}
