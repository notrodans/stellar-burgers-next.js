import Link from "next/link";
import { LoginForm } from "~/features/auth";
import { CONSTANTS_MAP, ROUTER_PATHS } from "~/shared/constants";
import { Paragraph } from "~/shared/ui";

export function LoginPage() {
  const content = CONSTANTS_MAP.pages.login;
  return (
    <div className="flex flex-col items-center pt-2 lg:pt-20">
      <Paragraph size="medium" className="font-bold pb-4">
        {content.mainText}
      </Paragraph>
      <LoginForm />
      <div className="flex flex-col items-center gap-2 pt-5 lg:pt-10">
        <Paragraph variant="inactive">
          {content.registerText}{" "}
          <Link href={ROUTER_PATHS.SIGN_UP} className="text-accent">
            {content.registerLink}
          </Link>
        </Paragraph>
        <Paragraph variant="inactive">
          {content.forgotPasswordText}{" "}
          <Link href={ROUTER_PATHS.FORGOT_PASSWORD} className="text-accent">
            {content.forgotPasswordLink}
          </Link>
        </Paragraph>
      </div>
    </div>
  );
}
