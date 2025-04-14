"use client";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { EyeSlashIcon } from "@heroicons/react/16/solid";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isshowPassword, setIsshowPassword] = useState(false);
  const router =useRouter();
  const schema = yup.object({
    identifier: yup.string().required(),
    password: yup.string().required().min(8).max(16),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  async function submitForm(user) {
    console.log("form data:", user); 

    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local",
        user
      );
      localStorage.setItem("token", response.data.jwt);
      console.log("called", response.data.user.username);

      toast.success("User logged in successfully", {
        type: "success",

      });
      router.push("/")
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||  // در صورتی که Strapi پیام رو اینجا برگردونه
        error.message ||
        "Something went wrong";
    
      toast.error(errorMessage, {
        type: "error",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-4 w-full max-w-md p-4"
    >
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

      <div className="flex justify-between">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-[var(--color-primary)] hover:underline "
        >
          Forget your password?
        </Link>
        <span
          onClick={() => setIsshowPassword(!isshowPassword)}
          className="h-6 w-6 text-current"
        >
          {isshowPassword ? <EyeIcon /> : <EyeSlashIcon />}
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