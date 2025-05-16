"use client";

import { useSession } from "~/entities/session";
import { LogoutButton } from "~/features/auth";

export function HomePage() {
  return (
    <div>
      <LogoutButton />
      <br />
    </div>
  );
}
