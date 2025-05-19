"use client";

import type { LinkProps } from "next/link";
import { startTransition, useEffect, useState } from "react";
import { createStrictContext, useStrictContext } from "./react";
import Link, { useLinkStatus } from "next/link";

type LocationState =
  | {
      [key: string]: unknown;
    }
  | undefined;

type LocationStateContext = {
  state: LocationState;
  setState: (state: LocationState) => void;
};

const locationStateContext = createStrictContext<LocationStateContext>();

export function LocationStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<LocationState>(undefined);

  return (
    <locationStateContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </locationStateContext.Provider>
  );
}

export function useLocationState<T = LocationState>() {
  const { state, setState } = useStrictContext(locationStateContext);
  return { state: state as T | undefined, setState };
}

function LoadingIndicator({ state }: { state: LocationState }) {
  const { setState } = useLocationState();
  const { pending } = useLinkStatus();

  useEffect(() => {
    if (pending) {
      startTransition(() => {
        setState(state);
      });
    }
  }, [pending, setState, state]);

  return null;
}

export function LocationLink({
  children,
  state,
  ...props
}: {
  children: React.ReactNode;
  state: LocationState;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps) {
  return (
    <Link {...props}>
      <LoadingIndicator state={state} />
      {children}
    </Link>
  );
}
