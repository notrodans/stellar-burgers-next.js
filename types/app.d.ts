import { LinkProps } from "next/link";

declare global {
  type Url = Pick<LinkProps, "href">;
}
