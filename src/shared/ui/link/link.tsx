"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICONS_MAP } from "~/shared/constants";
import { cn } from "~/shared/lib/css";
import type { NavigationLinkProps } from "./types";

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  to,
  icon,
  children,
  className,
  ...props
}) => {
  const pathname = usePathname();
  const IconComponent = icon ? ICONS_MAP[icon] : null;
  const isActive = pathname === to;

  return (
    <Link
      href={to}
      {...props}
      className={cn(className, "flex flex-row gap-2 text-inactive", {
        "text-white": isActive,
      })}
    >
      <>
        {IconComponent && <IconComponent />}
        {children}
      </>
    </Link>
  );
};
