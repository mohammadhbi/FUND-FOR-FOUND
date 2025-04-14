
import Image from "next/image";
import LogoAuth from "../../../asests/LogoAuth.svg";
import GoogleLoginButton from "@/app/auth/components/GoogleLoginButton";
import LoginForm from "@/app/auth/components/LoginForm";
import Navbar from "@/app/components/Navbar";

export default function LogIn() {
  return (
    <div>
      <Navbar/>
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
