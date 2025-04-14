import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import ForgotpasswordI from "../../../../public/ForgotpasswordI.svg";

function Forgotpassword() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center pt-16">
        <Image src={ForgotpasswordI} alt="" width={109.77} height={100} />
        <p className="text-[var(--color-primary)] text-3xl">Trouble With logging in?</p>
        <p className="text-[var(--color-gray-2)] text-xs text-center">
          Enter your email address or phone number and we'll{" "}
          <span className="block text-center">send you a link to get back into your account.</span>
        </p>
        <div className="flex flex-col  w-full max-w-md p-4">
          <label className="text-xs " >
            Mobile number or email address
          </label>
          <input
          type="text"
          placeholder="e.g., 09120000000 or yourname@yahoo.com"
          className="border border-[var(--color-gray-2)] rounded-md px-3 py-2 text-[var(--color-gray-2)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
          <button
        type="submit"
        className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-primary-300)] transition-colors mt-4"
      >
        Continue
      </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-5">
          <div className="h-px w-44 bg-[var(--color-light-4)]"></div>
          <span className="text-[var(--color-light-1)]">or</span>
          <div className="h-px w-44 bg-[var(--color-light-4)]"></div>
        </div>
        <Link className="text-xl pt-0.5 " href="/auth/signup">
     <span className="text-[var(--color-primary)]">
     Create an account
      </span> 
      </Link>
      <Link className="pt-0.5 " href="/auth/Login">
     <span className="text-[var(--color-black)]">
     Back to Login
      </span> 
      </Link>
      </div>
    </div>
  );
}

export default Forgotpassword;
