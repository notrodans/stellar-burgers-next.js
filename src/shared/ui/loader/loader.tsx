import Image from "next/image";
import { cn } from "~/shared/lib/css";
import slogo from "~/shared/ui/slogo.png";
import { Paragraph } from "../typography";
import { LoaderProps } from "./types";

export const Loader: React.FC<LoaderProps> = ({
  text,
  screen = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center  gap-2 lg:gap-4",
        screen && "fixed inset-0 bg-primary",
        className,
      )}
    >
      <Image
        width={96}
        height={96}
        src={slogo}
        className="h-24 w-24 animate-pulse"
        alt="preloader"
      />
      <Paragraph>{text}</Paragraph>
    </div>
  );
};
