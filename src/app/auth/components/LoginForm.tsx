"use client";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export type UserFormData = {
  identifier: string;
  password: string;
};


export const schema = yup.object({
  identifier: yup.string().required("Identifier is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
}).required();

export default function LoginForm() {
  const [isshowPassword, setIsshowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });


  const submitForm: SubmitHandler<UserFormData> = async (user) => {
    console.log("form data:", user);

    try {
      const response = await axios.post("https://my-strapi-project-lm3x.onrender.com/api/auth/local", user);
      localStorage.setItem("token", response.data.jwt);
      console.log("called", response.data.user.username);

      toast.success("User logged in successfully");
      router.push("/");
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          error.message ||
          errorMessage;

        console.error(errorMessage);
      } else if (error instanceof Error) {
        errorMessage = error.message;
        console.error(errorMessage);
      } else {
        console.error("An unknown error occurred", error);
      }

      toast.error(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-4 w-full max-w-md p-4"
    >
      {/* identifier */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[var(--color-gray-2)]">
          Mobile number or email address
        </label>
        <input
          {...register("identifier")}
          type="text"
          placeholder="e.g., 09120000000 or yourname@yahoo.com"
          className="border border-[var(--color-gray-2)] rounded-md px-3 py-2 text-[var(--color-gray-2)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <p className="text-red-500 text-sm">{errors.identifier?.message}</p>
      </div>

      {/* password */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[var(--color-gray-2)]">
          Password
        </label>
        <input
          {...register("password")}
          type={isshowPassword ? "text" : "password"}
          className="border border-[var(--color-gray-2)] rounded-md px-3 py-2 text-[var(--color-gray-2)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>
      <div className="flex justify-between items-center">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-[var(--color-primary)] hover:underline"
        >
          Forget your password?
        </Link>
        <span
          onClick={() => setIsshowPassword(!isshowPassword)}
          className="h-6 w-6 text-current cursor-pointer"
        >
          {isshowPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
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
