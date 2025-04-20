import { useSearchParams } from "next/navigation";
import LogoAuth from "../../../../public/LogoAuth.png"
import Image from "next/image"
import { Suspense } from "react";
function ConfirmCode() {
    const searchParams = useSearchParams();
    const phoneNumber = searchParams.get("phone")
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <div>
      <div className="flex flex-col justify-center items-center pt-16">
        <h1 className="text-[var(--color-primary)] text-3xl">FUND FOR FOUND</h1>
        <Image src={LogoAuth} alt="" width={109.77} height={100} />
        <p className="text-[var(--color-primary)] text-3xl">Enter confirmation code</p>
        <p>Enter the 6-digital login code we send the new</p>
        <span>{phoneNumber}</span>
    </div>
    </div>
    </Suspense>
  )
}

export default ConfirmCode
