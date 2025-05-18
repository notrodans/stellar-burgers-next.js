import { PrivateLoader } from "../_/loaders/private-loader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PrivateLoader>{children}</PrivateLoader>;
}
