"use client";

import { ConstructorProvider } from "~/entities/constructor";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConstructorProvider value={{ bun: null, ingredients: [] }}>
      {children}
    </ConstructorProvider>
  );
}
