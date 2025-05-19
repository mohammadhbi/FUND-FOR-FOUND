// "use client";

// import { useState } from "react";
// import Image from "next/image";
// export default function AddTier() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     amount: "",
//     coverPhoto: null as File | null,
//   });
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setForm((prev) => ({ ...prev, coverPhoto: file }));
//   };
//   return (
//     <div>
//       <div className="w-64 h-96 border rounded-md flex flex-col items-center  bg-white shadow">
//         <div className="w-full h-6 bg-purple-700 rounded"></div>

//         <div className="mt-16 text-gray-500 text-lg">Add Tier</div>

//         <button
//           className="mt-4 w-12 h-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-2xl hover:bg-purple-700"
//           onClick={() => setIsOpen(true)}
//         >
//           +
//         </button>
//         {isOpen && (
//           <div className="flex gap-6">

//             <div className="flex-1 space-y-4">
//               <h2 className="text-xl font-semibold text-purple-700">
//                 Tier type
//               </h2>

//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder="Name"
//                 className="border px-3 py-2 w-full"
//               />

//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 placeholder="Reward description"
//                 rows={3}
//                 className="border px-3 py-2 w-full"
//               />

//               <input
//                 type="text"
//                 name="amount"
//                 value={form.amount}
//                 onChange={handleChange}
//                 placeholder="Amount"
//                 className="border px-3 py-2 w-full"
//               />

//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 accept="image/*"
//                 className="block"
//               />

//               <button className="bg-purple-600 text-white px-4 py-2 rounded">
//                 Save
//               </button>
//             </div>

//             <div className="flex-1 p-4 border rounded space-y-2">
//               <h3 className="text-purple-700 font-bold text-center">
//                 {form.name || "Preview Name"}
//               </h3>
//               <p className="text-sm text-gray-500 text-center">
//                 Start at {form.amount || "0$"}
//               </p>
//               <p className="text-xs text-gray-600">
//                 {form.description || "No description yet..."}
//               </p>
//               {form.coverPhoto && (
//                 <Image
//                   src={URL.createObjectURL(form.coverPhoto)}
//                   alt="cover"
//                   className="w-full h-32 object-cover mt-2"
//                 />
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Image from "next/image";

interface Tier {
  name: string;
  description: string;
  amount: string;
  coverPhoto: File | null;
}

export default function AddTier() {
  const [isOpen, setIsOpen] = useState(false);
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [form, setForm] = useState<Tier>({
    name: "",
    description: "",
    amount: "",
    coverPhoto: null,
  });
  const [tierIndex, setTierIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    amount: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "amount") {
      // فقط عدد مجازه
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({ ...prev, amount: "Only numbers are allowed" }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, amount: "" }));
      }
    } else {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Only letters are allowed",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, coverPhoto: file }));
  };

  const handleSave = () => {
    if (tierIndex !== null) {
      const updateTiers = [...tiers];
      updateTiers[tierIndex] = form;
      setTiers(updateTiers);
    } else {
      setTiers((prev) => [...prev, form]);
    }
    setForm({
      name: "",
      description: "",
      amount: "",
      coverPhoto: null,
    });
    setTierIndex(null);
    setIsOpen(false);
  };
  return (
    <div className="flex gap-4 flex-wrap">
      {tiers.map((tier, index) => (
        <div
          key={index}
          className="w-64 h-96 border rounded-md flex flex-col items-center bg-white shadow relative"
        >
          <div className="w-full h-6 bg-purple-700 rounded-t"></div>
          <div className="mt-6 text-purple-700 font-semibold text-lg">
            {tier.name}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Start at {tier.amount}$
          </div>
          <div className="text-xs text-gray-600 px-3 mt-2 text-center">
            {tier.description}
          </div>
          {tier.coverPhoto && (
            <Image
              src={URL.createObjectURL(tier.coverPhoto)}
              alt="cover"
              width={200}
              height={120}
              className="mt-4 rounded object-cover w-48 h-24"
            />
          )}
          <button
            onClick={() => {
              setForm(tier);
              setTierIndex(index);
              setIsOpen(true);
            }}
            className="absolute bottom-2  bg-[var(--color-primary)] border px-2 py-1 text-xl text-white w-[90%] rounded hover:bg-gray-100"
          >
            Edit Tier
          </button>
        </div>
      ))}

      <div className="w-64 h-96 border rounded-md flex flex-col items-center bg-white shadow">
        <div className="w-full h-6 bg-purple-700 rounded-t"></div>
        <div className="mt-16 text-gray-500 text-lg">Add Tier</div>
        <button
          className="mt-4 w-12 h-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-2xl hover:bg-purple-700"
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 flex flex-col md:flex-row gap-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>

            <div className="flex-1 space-y-4">
              <h2 className="text-xl font-semibold text-purple-700">
                Tier Type
              </h2>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border px-3 py-2 w-full rounded"
              />
              {errors.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
              )}
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Reward description"
                rows={3}
                className="border px-3 py-2 w-full rounded"
              />
              {errors.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
              )}
              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="border px-3 py-2 w-full rounded"
              />
              {errors.amount && (
                <div className="text-red-500 text-sm">{errors.amount}</div>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="block w-full"
              />

              <button
                onClick={handleSave}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Save
              </button>
            </div>

            <div className="flex-1 p-4 border rounded space-y-2 bg-gray-50">
              <h3 className="text-purple-700 font-bold text-center text-lg">
                {form.name || "Preview Name"}
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Start at {form.amount || "0$"}
              </p>
              <p className="text-sm text-gray-600">
                {form.description || "No description yet..."}
              </p>
              {form.coverPhoto && (
                <Image
                  src={URL.createObjectURL(form.coverPhoto)}
                  alt="cover"
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded mt-2"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
