import { LayoutNavbar } from "~/widgets/layout-navbar";

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="h-16 lg:h-24 bg-dark">
        <LayoutNavbar />
      </header>
      <main className="container pt-2 lg:pt-10">{children}</main>
    </>
  );
};

export { RootLayout };
