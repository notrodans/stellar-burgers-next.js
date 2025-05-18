import { ProfileLayout } from "~/app/_/layouts/profile-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
