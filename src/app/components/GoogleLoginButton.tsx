"use client";

import { signIn } from "next-auth/react";

export default function GoogleLoginButton() {
  return (
    <div>
        <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="w-[341px] sm:w-[383px] bg-[var(--color-light-4)] text-[var(--color-gray-2)] px-4 py-2 rounded-md hover:bg-[var(--primary-300)] transition-colors"
    >
      Continue with Google
    </button>
 
    </div>
  );
}