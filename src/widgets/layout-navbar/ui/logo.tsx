import Image from "next/image";
import Link from "next/link";
import { ROUTER_PATHS } from "~/shared/constants";
import logo from "~/shared/ui/logo.png";
import slogo from "~/shared/ui/slogo.png";

export const MobileLogo: React.FC = () => {
  return (
    <Link href={ROUTER_PATHS.HOME}>
      <Image src={slogo} alt="mobile logo" width={50} height={50} />
    </Link>
  );
};

export const Logo: React.FC = () => {
  return (
    <Link href={ROUTER_PATHS.HOME}>
      <Image
        src={logo}
        alt="logo"
        width={290}
        height={50}
        className="hover:scale-110 duration-500"
      />
    </Link>
  );
};
