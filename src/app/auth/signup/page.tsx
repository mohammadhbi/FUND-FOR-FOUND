"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import LogoAuth from "../../../../public/LogoAuth.png";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://my-strapi-project-lm3x.onrender.com/api/auth/local/register",
        {
          username,
          email,
          password,
        }
      );
      console.log("User registered:", response.data);

      toast.success("User registered successfully!");
      router.push("/auth/Login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Sign up error:", error.response?.data);
        toast.error(error.response?.data?.message || "Something went wrong!");
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <Image src={LogoAuth} alt="" width={109.77} height={100} />

      <form onSubmit={handleSignUp} className="w-full max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--color-gray-2)]">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--color-gray-2)]">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--color-gray-2)]">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md w-full"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
