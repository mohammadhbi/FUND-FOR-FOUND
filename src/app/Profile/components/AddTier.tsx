"use client";

import { useState } from "react";
import Image from "next/image";
export default function AddTier() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    amount: "",
    coverPhoto: null as File | null,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, coverPhoto: file }));
  };
  return (
    <div>
      <div className="w-64 h-96 border rounded-md flex flex-col items-center  bg-white shadow">
        <div className="w-full h-6 bg-purple-700 rounded"></div>

        <div className="mt-16 text-gray-500 text-lg">Add Tier</div>

        <button
          className="mt-4 w-12 h-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-2xl hover:bg-purple-700"
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
        {isOpen && (
          <div className="flex gap-6">
            {/* Form section */}
            <div className="flex-1 space-y-4">
              <h2 className="text-xl font-semibold text-purple-700">
                Tier type
              </h2>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border px-3 py-2 w-full"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Reward description"
                rows={3}
                className="border px-3 py-2 w-full"
              />

              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="border px-3 py-2 w-full"
              />

              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="block"
              />

              <button className="bg-purple-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>

            {/* Preview section */}
            <div className="flex-1 p-4 border rounded space-y-2">
              <h3 className="text-purple-700 font-bold text-center">
                {form.name || "Preview Name"}
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Start at {form.amount || "0$"}
              </p>
              <p className="text-xs text-gray-600">
                {form.description || "No description yet..."}
              </p>
              {form.coverPhoto && (
                <Image
                  src={URL.createObjectURL(form.coverPhoto)}
                  alt="cover"
                  className="w-full h-32 object-cover mt-2"
                />
              )}
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
