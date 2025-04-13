import Link from "next/link";
import Image from "next/image";
import LogoAuth from "../../../asests/LogoAuth.svg";
import GoogleLoginButton from "@/app/components/GoogleLoginButton";
import LoginForm from "@/app/components/LoginForm";
const navItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "About Us", href: "/about" },
  { name: "Help & Support", href: "/help" },
];

export default function Navbar() {
  return (
    <div>
      <nav className="flex w-full items-center justify-center sticky top-0  bg-background/70 backdrop-blur-lg h-[4rem]">
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
      <div className="flex flex-col justify-center items-center pt-16">
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
<LoginForm/>
      </div>
    </div>
  );
}
