import Link from "next/link";
import Image from "next/image";
import LogoAuth from "../../../asests/LogoAuth.svg";
import GoogleLoginButton from "@/app/components/GoogleLoginButton";
const navItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "About Us", href: "/about" },
  { name: "Help & Support", href: "/help" },
];

export default function Navbar() {
  return (
    <div>
      <nav className="flex w-full items-center justify-center sticky top-0 border-b bg-background/70 backdrop-blur-lg h-[4rem]">
        <ul className="flex gap-5 items-center justify-center text-sm text-gray-3 w-[26.6%] max-w-[384px] min-w-[200px] h-[33px]">
          {navItems.map((item) => (
            <li key={item.href} className="text-medium whitespace-nowrap">
              <Link
                href={item.href}
                className="text-foreground hover:opacity-80 transition-opacity"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col justify-center items-center pt-42">
        <h1 className="text-[var(--color-primary)] text-3xl">FUND FOR FOUND</h1>
        <p className="text-[var(--color-gray-2)] text-xs text-center">
          Create an account or sign in to start{" "}
          <span className="block text-center">Creating</span>
        </p>
        <Image src={LogoAuth} alt="" width={109.77} height={100} />
        <GoogleLoginButton />
        <div className="flex items-center justify-center gap-2 mt-5">
          <div className="h-px w-44 bg-[var(--color-light-4)]"></div>
          <span className="text-[var(--color-light-1)]">or</span>
          <div className="h-px w-44 bg-[var(--color-light-4)]"></div>
        </div>

        <form className="flex flex-col gap-4 w-full max-w-md p-4">
          {/* Input 1: Mobile number or email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="identifier"
              className="text-sm font-medium text-[var(--color-gray-2)]"
            >
              Mobile number or email address
            </label>
            <input
              type="text"
              id="identifier"
              placeholder="e.g., 09120000000 or yourname@yahoo.com"
              className="border border-[var(--color-gray-2)] rounded-md px-3 py-2 text-[var(--color-gray-2)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* Input 2: Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[var(--color-gray-2)]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-[var(--color-gray-2)] rounded-md px-3 py-2 text-[var(--color-gray-2)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* Forget Password Link */}
          <Link
            href="/auth/forgot-password"
            className="text-sm text-[var(--primary)] hover:underline text-right"
          >
            Forget your password?
          </Link>

          {/* Confirm Button */}
          <button
            type="submit"
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-md hover:bg-[var(--primary-300)] transition-colors"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
