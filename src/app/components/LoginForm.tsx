"use client";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { EyeSlashIcon } from "@heroicons/react/16/solid";

export default function LoginForm() {
  const [isshowPassword, setIsshowPassword] = useState(false);
  return (
    <form className="flex flex-col gap-4 w-full max-w-md p-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[var(--color-gray-2)]">
          Mobile number or email address
        </label>
        <input
          type="text"
          placeholder="e.g., 09120000000 or yourname@yahoo.com"
          className="border border-[var(--color-gray-2)] rounded-md px-3 py-2 text-[var(--color-gray-2)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[var(--color-gray-2)]">
          Password
        </label>
        <input
          type="password"
          className="border border-[var(--color-gray-2)] rounded-md px-3 py-2 text-[var(--color-gray-2)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>

      <div className="flex justify-between">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-[var(--color-primary)] hover:underline "
        >
          Forget your password?
        </Link>
        <span 
        onClick={()=>setIsshowPassword(!isshowPassword)}
        className="h-6 w-6 text-current">
{isshowPassword ? <EyeIcon/> :<EyeSlashIcon/> }
        </span>
      </div>
      <button
        type="submit"
        className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-primary-300)] transition-colors"
      >
        Continue
      </button>
    </form>
  );
}
