"use client";

import Navbar from "@/app/components/Navbars component/Navbar";
import Image from "next/image";
import Link from "next/link";
import ForgotpasswordI from "../../../../public/ForgotpasswordI.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const schema = yup.object({
  identifier: yup
    .string()
    .required("This field is required")
    .min(8, "Must be at least 8 characters"),
});

type ForgotPasswordFormData = {
  identifier: string;
};

function Forgotpassword() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const submitValue = watch("identifier");

  const onSubmit = (data: ForgotPasswordFormData) => {
    const value = data.identifier.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^09\d{9}$/;

    if (emailRegex.test(value)  ) {
      console.log("Submitted Data:", data);
      router.push(`/auth/forgot-password/sent?email=${value}`);
    }else if(phoneRegex.test(value)){
      console.log("Phone Submitted:", value);
      router.push(`/auth/forgot-password/confirmcode?phone=${value}`);
    }
     else {
      alert("Please enter a valid email address or Iranian phone number starting with 09.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center pt-16">
        <Image
          src={ForgotpasswordI}
          alt="Forgot Password Illustration"
          width={110}
          height={100}
        />

        <p className="text-[var(--color-primary)] text-3xl">Trouble Logging In?</p>
        <p className="text-[var(--color-gray-2)] text-xs text-center mt-2">
          Enter your email address or phone number and we’ll
          <span className="block">send you a link to get back into your account.</span>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full max-w-md p-4 gap-3"
        >
          <div className="flex flex-col">
            <label className="text-xs">Mobile number or email address</label>
            <input
              {...register("identifier")}
              type="text"
              placeholder="e.g., 09120000000 or yourname@yahoo.com"
              className="border border-[var(--color-gray-2)] rounded-md px-3 py-2 text-[var(--color-gray-2)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.identifier?.message}
            </p>
          </div>

          <button
            type="submit"
            disabled={!submitValue || submitValue.length < 8}
            className={`px-4 py-2 rounded-md transition-colors text-white ${
              submitValue && submitValue.length >= 8
                ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-300)]"
                : "bg-[var(--color-primary-100)] cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-5">
          <div className="h-px w-44 bg-[var(--color-light-4)]"></div>
          <span className="text-[var(--color-light-1)]">or</span>
          <div className="h-px w-44 bg-[var(--color-light-4)]"></div>
        </div>

        <Link className="text-xl pt-0.5 text-[var(--color-primary)]" href="/auth/signup">
          <span className="text-[var(--color-primary)]">Create an account</span>
        </Link>
        <Link className="pt-0.5 text-[var(--color-black)]" href="/auth/login">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default Forgotpassword;

