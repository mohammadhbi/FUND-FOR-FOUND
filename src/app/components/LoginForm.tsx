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

export default function LoginForm() {
  const [isshowPassword, setIsshowPassword] = useState(false);
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
    console.log("form data:", user); // اینو اضافه کن!

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
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error?.message || error.message, {
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
// "use client";
// import Link from 'next/link';
// import { useState } from 'react';
// import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
// import { useRouter } from 'next/navigation';

// export default function LoginForm() {
//   const [identifier, setIdentifier] = useState(''); // می‌تونه ایمیل یا یوزرنیم باشه
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await fetch('http://localhost:1337/api/auth/local', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           identifier, // ایمیل یا یوزرنیم
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error?. nessagemessage || 'Login failed');
//       }

//       console.log('User logged in:', data);
//       // ذخیره JWT (مثلاً توی localStorage یا cookie)
//       localStorage.setItem('jwt', data.jwt);
//       localStorage.setItem('user', JSON.stringify(data.user));

//     } catch (err) {
//       setError(err.message || 'Something went wrong');
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md p-4">
//       <div className="flex flex-col gap-2">
//         <label className="text-sm font-medium text-[var(--color-gray-2)]">
//           Email or Username
//         </label>
//         <input
//           type="text"
//           placeholder="e.g., testuser@example.com or testuser"
//           className="border border-[var(--color-gray-2)] rounded-md px-3 py-2 text-[var(--color-gray-2)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
//           value={identifier}
//           onChange={(e) => setIdentifier(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col gap-2">
//         <label className="text-sm font-medium text-[var(--color-gray-2)]">
//           Password
//         </label>
//         <div className="relative">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             className="border border-[var(--color-gray-2)] rounded-md px-3 py-2 text-[var(--color-gray-2)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] w-full"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             type="button"
//             onClick={togglePasswordVisibility}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-gray-2)] hover:text-[var(--primary)] w-5 h-5"
//           >
//             {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
//           </button>
//         </div>
//       </div>
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//       <Link href="/auth/forgot-password" className="text-sm text-[var(--color-primary)] hover:underline text-right">
//         Forget your password?
//       </Link>
//       <button
//         type="submit"
//         className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-primary-300)] transition-colors"
//       >
//         Login
//       </button>
//       <Link href="/auth/signup" className="text-sm text-[var(--color-primary)] hover:underline text-center">
//         Don’t have an account? Sign up
//       </Link>
//     </form>
//   );
// }
