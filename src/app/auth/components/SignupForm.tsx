"use client";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// type تعریف فرم
export type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

// ولیدیشن schema
const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^09\d{9}$/, "Invalid phone number"),
  })
  .required();

function SignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  // ثبت فرم
  const submitForm: SubmitHandler<SignupFormData> = async (data) => {
    console.log("signup data:", data);
    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username: `${data.firstName} ${data.lastName}`,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
        }
      );

      console.log("signup success", response.data);
      toast.success("User registered successfully");
      router.push("/auth/login");
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
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">First name</label>
        <input
          {...register("firstName")}
          type="text"
          className="border rounded-md px-3 py-2"
        />
        <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
      </div>

   
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Last name</label>
        <input
          {...register("lastName")}
          type="text"
          className="border rounded-md px-3 py-2"
        />
        <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Email</label>
        <input
          {...register("email")}
          type="email"
          className="border rounded-md px-3 py-2"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      </div>
      <button
        type="submit"
        className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm;
