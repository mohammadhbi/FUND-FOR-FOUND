"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import NextButtonStep from "../../IntroBrand/components/Editor Summery/NextButtonStep";
import { useRouter } from "next/navigation";
import { client } from "@/lib/axios";


type FormValues = {
  Brandname: string;
  category: string;
  Subcategory: string;
  tags: string[];
  agree: boolean;
  Country: string;
};

export default function CreateBrandForm() {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      Brandname: "",
      Country: "",
      category: "",
      Subcategory: "",
      tags: [] as string[],
      agree: false,
    },
  });

  const [tagInput, setTagInput] = useState("");
  const [step, setStep] = useState(1);
  const stepsLength = 3;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const tags = watch("tags");
  const agree = watch("agree");

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const payload = {
        data: {
          Brandname: data.Brandname,
          Country: data.Country,
          category: data.category,
          Subcategory: data.Subcategory,
          tags: data.tags,
          agree: data.agree,
          users_permissions_user: userId,
        },
      };
      const response = await client.post("/brand-forms", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // ⚠️ NOTE: This is  a worst practice.
// Ideally, we should always use the exact ID returned by the backend.
// Due to auto-increment behavior in the database and mismatches between created records,
// I'm manually adjusting the ID here as a temporary workaround.

const actualId = response.data.data.id;
const brandId = actualId ;

console.log("📦 Real ID:", actualId);
console.log("🛠 Adjusted ID:", brandId);

localStorage.setItem("brandId", String(brandId));
      console.log("Form submitted successfully:", response.data);
      const brandName = data.Brandname;
localStorage.setItem("brandName", String(brandName));
      if (step < stepsLength) {
        setStep(step + 1);
      }
      router.push("/createbrand/IntroBrand");
    } catch (error) {
      console.error("Error submitting brand form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setValue("tags", [...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setValue("tags", newTags);
  };

  const isFormValid =
    watch("Brandname") &&
    watch("Country") &&
    watch("category") &&
    watch("Subcategory") &&
    agree;

  const isButtonDisabled = !isFormValid || step === stepsLength || isLoading;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className=" mb-8 gap-4">
        <>
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            Basic info
          </h2>
          <h3 className="text-xl font-semibold mt-2">
            Tell about your Brand/organization
          </h3>
          <p className="text-gray-600 mt-1">
            Provide an overview of the brand or organization you want to
            register on 3F.
          </p>

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Brand/organization name{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("Brandname", { required: true })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                  placeholder="Brand name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("Country", { required: true })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                >
                  <option value="" disabled>
                    choose your country
                  </option>
                  <option value="Iran">Iran</option>
                  <option value="USA">USA</option>
                  <option value="UAE">UAE</option>
                  <option value="UK">UK</option>
                </select>
              </div>
            </div>

            <p className="text-gray-600 mt-4">
              Select the primary category that best describes your brand or
              organization. Then select the subcategory that further defines
              your brand or organization.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("category", { required: true })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                  placeholder="Category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subcategory <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("Subcategory", { required: true })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                  placeholder="Subcategory"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Brand tags <span className="text-gray-500">(optional)</span>
              </label>
              <div className="mt-1 flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md">
                {tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-2 text-gray-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                  className="flex-1 border-none outline-none p-1"
                  placeholder="By typing # make your own tag"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center">
              <input
                type="checkbox"
                {...register("agree", { required: true })}
                className="h-4 w-4 text-[var(--color-primary)] border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                I agree with the terms of service of 3F.
              </label>
            </div>

            <div className="mt-4">
              <NextButtonStep
                onClick={handleSubmit(onSubmit)}
                disabled={isButtonDisabled}
              />
            </div>
          </form>
        </>
      </div>
    </div>
  );
}
