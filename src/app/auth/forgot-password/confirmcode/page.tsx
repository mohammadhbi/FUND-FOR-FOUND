"use client";

import { useSearchParams } from "next/navigation";
import LogoAuth from "../../../../../public/LogoAuth.svg";
import Image from "next/image";
import { Suspense, useRef, useState } from "react";
import clsx from "clsx";

function ConfirmCode() {
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone");
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (value.length > 1) {
      handlePaste(value, index);
      return;
    }
    e.target.value = value.replace(/[^0-9]/g, ""); 
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (value: string, index: number) => {
    const digits = value.replace(/\D/g, "").split("").slice(0, 6);
    digits.forEach((digit, i) => {
      const targetIndex = index + i;
      if (targetIndex < 6) {
        inputsRef.current[targetIndex]!.value = digit;
      }
    });
    if (digits.length === 6) {
      inputsRef.current[5]?.focus();
    } else if (index + digits.length < 6) {
      inputsRef.current[index + digits.length]?.focus();
    }
  };

  const getCode = () => {
    return inputsRef.current.map((input) => input.value).join("");
  };

  const handleSubmit = async () => {
    const code = getCode();
    if (code.length !== 6) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("http://localhost:1337/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, code }),
      });

      if (res.ok) {
        alert("Code confirmed successfully!");
      } else {
        alert("Invalid code. Please try again.");
      }
    } catch (err) {
      console.error("Error confirming code", err);
      alert("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col justify-center items-center pt-16">
        <h1 className="text-[var(--color-primary)] text-3xl">FUND FOR FOUND</h1>
        <Image src={LogoAuth} alt="" width={109.77} height={100} />
        <p className="text-[var(--color-primary)] text-3xl">
          Enter confirmation code
        </p>
        <p>We sent the 6-digit login code to:</p>
        <span>{phoneNumber}</span>

        <div className="flex gap-3 mt-4">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el!;
              }}
              type="text"
              maxLength={1}
              className={clsx(
                "w-12 h-12 border text-center text-2xl rounded outline-none transition-all duration-300",
                error
                  ? "border-red-500 animate-shake"
                  : "border-[var(--color-gray-2)]",
                "focus:ring-2 focus:ring-[var(--color-primary)]"
              )}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => {
                e.preventDefault();
                handlePaste(e.clipboardData.getData("Text"), index);
              }}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-6 px-6 py-2 rounded text-white transition-colors ${
            loading
              ? "bg-[var(--color-primary-100)] cursor-not-allowed"
              : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-300)]"
          }`}
        >
          {loading ? "Verifying..." : "Confirm"}
        </button>
      </div>
    </Suspense>
  );
}

export default ConfirmCode;
