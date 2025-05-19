import Link from "next/link";
import { ResetPasswordForm } from "~/features/auth";
import { CONSTANTS_MAP, ROUTER_PATHS } from "~/shared/constants";
import { Paragraph } from "~/shared/ui";

export const ResetPasswordPage: React.FC = () => {
  const content = CONSTANTS_MAP.pages.resetPassword;

  return (
    <div className="flex flex-col items-center pt-2 lg:pt-20">
      <Paragraph size="medium" className="font-bold pb-4">
        {content.mainText}
      </Paragraph>
      <ResetPasswordForm />
      <div className="flex flex-col items-center gap-2 pt-5 lg:pt-10">
        <Paragraph variant="inactive">
          {content.rememberPasswordText}{" "}
          <Link href={ROUTER_PATHS.SIGN_UP} className="text-accent">
            {content.rememberPasswordLink}
          </Link>
        </Paragraph>
      </div>
    </div>
  );
};
