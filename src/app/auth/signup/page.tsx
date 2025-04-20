import Navbarsignin from "@/app/components/Navbar-signUp"
import Link from "next/link"
import Image from "next/image"
import LogoAuth from "../../../../public/LogoAuth.png"
import GoogleLoginButton from "../components/GoogleLoginButton"
import SignupForm from "../components/SignupForm"

function SignUp() {
  return (
    <div>
     <Navbarsignin/>
      <div className="flex flex-col items-center justify-center">
      <div className="flex justify-between w-full">
      <Link href="/">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10  text-[var(--color-primary)]">
  <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
</svg>
</Link>
<p className="left-1/3">
  Create your personal account
</p>
      </div>
      <p>FUND-FOR-FOUND</p>
      <Image src={LogoAuth} alt="FUND_FOR" width={109.77} height={100} />
      <GoogleLoginButton/>
      <div className="flex items-center justify-center gap-2 mt-5">
          <div className="h-px w-44 bg-[var(--color-light-4)]"></div>
          <span className="text-[var(--color-light-1)]">or</span>
          <div className="h-px w-44 bg-[var(--color-light-4)]"></div>
        </div>
        <SignupForm/>
      </div>
    </div>
  )
}

export default SignUp
