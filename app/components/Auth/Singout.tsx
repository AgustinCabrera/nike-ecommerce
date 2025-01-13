'use client';
import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="text-white inline-flex items-center px-1 pt-1 text-sm font-medium"
    >
      Sign Out
    </button>
  );
}
