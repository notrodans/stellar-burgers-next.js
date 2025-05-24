import { LayoutNavbar } from "~/widgets/layout-navbar";

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-dvh overflow-clip">
      <header className="h-16 lg:h-24 bg-dark">
        <LayoutNavbar />
      </header>
      <main className="grow flex flex-col container pt-2 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export { RootLayout };
