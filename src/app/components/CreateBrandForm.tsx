// import React from "react";

// export default function CreateBrandForm() {
//   return (
//     <div className="border border-amber-600 flex flex-col">
//       <p className="text-bold text-[var(--color-primary)]">Basic info</p>
//       <p>Tell about your Brand/organization</p>
//       <p>
//         Provide an over view of the brand or organization you want to register
//         on3F.
//       </p>
//       <div className="border border-amber-600  flex">
//         <div className="border border-amber-600 ">
//           <label htmlFor="input">Brand/organization</label>
//           <input type="text" className="border border-amber-600 " />
//         </div>
//         <div className="border border-amber-600 ">
//           <label htmlFor="input">Country</label>
//           <input type="text" className="border border-amber-600" />
//         </div>
//         <p>
//           Select the primary category that best describes your brand or
//           organization.Then select the subcategory that further defines your
//           brand or organization
//         </p>
//         <div className="border border-amber-600 p-3">
//           <div className="border border-amber-600 p-3">
//             <label htmlFor="input">Brand/organization</label>
//             <input type="text" className="border border-amber-600 p-3" />
//           </div>
//           <div className="border border-amber-600 p-3">
//             <label htmlFor="input">Brand/organization</label>
//             <input type="text" className="border border-amber-600 p-3" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";

export default function CreateBrandForm() {
  const [brandName, setBrandName] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [agree, setAgree] = useState(false);

  // تابع برای مدیریت اضافه کردن تگ‌ها
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // تابع برای حذف تگ
  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-[var(--color-primary)]">
        Basic info
      </h2>
      <h3 className="text-xl font-semibold mt-2">
        Tell about your Brand/organization
      </h3>
      <p className="text-gray-600 mt-1">
        Provide an overview of the brand or organization you want to register on
        3F.
      </p>

      {/* فیلد Brand/organization name و Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand/organization name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            placeholder="time Brand et olganikation"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
          >
            <option value="" disabled>
              time Brend et olganikation
            </option>
            <option value="Ban dourtimns">Ban dourtimns</option>
            <option value="Bantinus">Bantinus</option>
          </select>
        </div>
      </div>

      {/* توضیحات Category و Subcategory */}
      <p className="text-gray-600 mt-4">
        Select the primary category that best describes your brand or
        organization. Then select the subcategory that further defines your brand
        or organization.
      </p>

      {/* فیلد Category و Subcategory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            placeholder="Pathngeen"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subcategory <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            placeholder="Pathngeen"
          />
        </div>
      </div>

      {/* فیلد Brand tags */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Brand tags <span className="text-gray-500">(optional)</span>
        </label>
        <div className="mt-1 flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-800 text-white px-2 py-1 rounded-md flex items-center"
            >
              {tag}
              <button
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
            placeholder="by typing # make your own tag"
          />
        </div>
      </div>

      {/* چک‌باکس و دکمه Continue */}
      <div className="mt-6 flex items-center">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="h-4 w-4 text-[var(--color-primary)] border-gray-300 rounded"
        />
        <label className="ml-2 text-sm text-gray-700">
          I agree with the terms of service of 3F.
        </label>
      </div>

      <button
        disabled={!agree}
        className="mt-4 bg-[var(--color-primary)] text-white px-6 py-2 rounded-md hover:bg-opacity-80 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Continue
      </button>
    </div>
  );
}