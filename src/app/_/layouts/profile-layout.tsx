import { LayoutSidebar } from "~/widgets/layout-sidebar";

const ProfileLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:pt-20 gap-10">
        <aside className="basis-1/3">
          <LayoutSidebar />
        </aside>
        {children}
      </div>
    </>
  );
};

export { ProfileLayout };
