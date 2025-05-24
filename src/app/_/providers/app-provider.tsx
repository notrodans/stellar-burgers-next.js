import { SWRConfig } from "swr";
import { LocationStateProvider } from "~/shared/lib";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <LocationStateProvider>{children}</LocationStateProvider>
    </SWRConfig>
  );
}
