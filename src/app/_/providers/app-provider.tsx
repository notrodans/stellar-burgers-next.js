import { LocationStateProvider } from "~/shared/lib";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <LocationStateProvider>{children}</LocationStateProvider>;
}
