"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import LogoAuth from "../../../../public/LogoAuth.png";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/16/solid";
import GoogleLoginButton from "../Login/components/GoogleLoginButton";
import NavbarsignUp from "@/app/components/Navbars component/Navbar-signUp";
import { client } from "@/lib/axios";
const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isshowPassword, setIsshowPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await client.post(
        "/auth/local/register",
        {
          username,
          email,
          password,
        }
      );

      const user = response.data.user;
      const firstLetter = username.charAt(0).toUpperCase();

      
      localStorage.setItem("username", user.username);
      localStorage.setItem("firstLetter", firstLetter);
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("userId", String(user.id));

      console.log("Signup response:", response.data);

      toast.success("User registered successfully!");
      router.push("/auth/signup/welcome");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Sign up error:", error.response?.data);
        toast.error(
          error.response?.data?.error?.message || "Something went wrong!"
        );
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <NavbarsignUp />
      <div className="flex flex-col justify-center p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-full h-16 flex items-center justify-center">
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                onClick={() => router.push("/")}
                className="size-6 absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--color-primary)]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </Link>

            <p className="text-[var(--color-gray-2)] text-2xl text-center">
              Confirm your email
            </p>
          </div>

          <h1 className="text-[var(--color-primary)] font-semibold text-3xl mt-4">
            FUND FOR FOUND
          </h1>

          <Image
            src={LogoAuth}
            alt="Logo"
            width={110}
            height={100}
            className="mb-2.5"
          />
          <GoogleLoginButton />
        </div>
        <div className="flex items-center justify-center gap-2 ">
          <div className="h-px w-44 bg-[var(--color-light-4)]"></div>
          <span className="text-[var(--color-light-1)]">or</span>
          <div className="h-px w-44 bg-[var(--color-light-4)]"></div>
        </div>

        <form
          onSubmit={handleSignUp}
          className="w-full max-w-md mx-auto space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-2)] mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-2)] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-2)] mb-1">
              Password
            </label>
            <input
              type={isshowPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-[var(--color-primary)]"
            />
            <div className="flex justify-between items-center">
              <p className="text-[var(--color-primary)]">
                <Link href="/auth/login">already have an account?</Link>
              </p>
              <span
                onClick={() => setIsshowPassword(!isshowPassword)}
                className="h-6 w-6 text-current cursor-pointer"
              >
                {isshowPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md w-full transition hover:bg-opacity-90"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
