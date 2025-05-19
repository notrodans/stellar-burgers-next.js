import Link from "next/link";
import { RegisterForm } from "~/features/auth";
import { CONSTANTS_MAP, ROUTER_PATHS } from "~/shared/constants";
import { Paragraph } from "~/shared/ui";

export const RegisterPage: React.FC = () => {
  const { loginLink, loginText, mainText } = CONSTANTS_MAP.pages.register;
  return (
    <div className="flex flex-col items-center pt-2 lg:pt-20">
      <Paragraph size="medium" className="font-bold pb-4">
        {mainText}
      </Paragraph>
      <RegisterForm />
      <div className="flex flex-col items-center gap-2 pt-5 lg:pt-10">
        <Paragraph variant="inactive">
          {loginText}
          <Link href={ROUTER_PATHS.SIGN_IN} className="text-accent">
            {loginLink}
          </Link>
        </Paragraph>
      </div>
    </div>
  );
};
