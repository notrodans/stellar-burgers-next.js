import { AuthLoader } from "~/app/_/loaders/auth-loader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLoader>{children}</AuthLoader>;
}
