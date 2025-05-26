
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/lib/axios";

interface Tier {
  name: string;
  description: string;
  amount: string;
  coverPhoto: File | null;
}

interface TierFromApi {
  id: number;
  attributes: {
    name: string;
    description: string;
    amount: string;
    image?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
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
 const [apiTiers,setTierApi]=useState<TierFromApi[]>([])
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "amount") {
      if (!/^[0-9]*$/.test(value)) {
        setErrors((prev) => ({ ...prev, amount: "Only numbers allowed" }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, amount: "" }));
      }
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, coverPhoto: file }));
  };

  const handleSave = () => {
    if (tierIndex !== null) {
      const updated = [...tiers];
      updated[tierIndex] = form;
      setTiers(updated);
    } else {
      setTiers((prev) => [...prev, form]);
    }
    setForm({ name: "", description: "", amount: "", coverPhoto: null });
    setTierIndex(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchTiers =async () =>{
      try {
        const res = await client.get("/tiers?populate=*");
        setTierApi(res.data.data);
      } catch (error) {
        console.error("error:",error);
      }
    }
    const uploadImage = async (file: File): Promise<number | null> => {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("files", file);

      try {
        const res = await client.post("/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data[0].id;
      } catch (err) {
        console.error("❌ Error uploading image:", err.response?.data || err.message);
        return null;
      }
    };

    const postTiers = async () => {
      const token = localStorage.getItem("token");
      const userId = Number(localStorage.getItem("userId"));

      for (const tier of tiers) {
        let imageId: number | null = null;

        if (tier.coverPhoto) {
          imageId = await uploadImage(tier.coverPhoto);
        }

        try {
          await client.post(
            "/tiers",
            {
              data: {
                name: tier.name,
                description: tier.description,
                amount: tier.amount,
                users_permissions_user: userId,
                ...(imageId && { image: imageId }),
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(`✅ Tier "${tier.name}" submitted`);
        } catch (error: any) {
          console.error(`❌ Error submitting tier "${tier.name}":`, error.response?.data || error.message);
        }
      }
    };

    if (tiers.length > 0) {
      postTiers();
    }
    fetchTiers()
  }, [tiers]);

  return (
    <div className="flex gap-4 flex-wrap">
      {apiTiers.map((item) => (
        <div key={item.id} className="w-64 h-96 border rounded-md flex flex-col items-center bg-white shadow relative">
          <div className="w-full h-6 bg-purple-700 rounded-t"></div>
          <div className="mt-6 text-purple-700 font-semibold text-lg">{item.name}</div>
          <div className="text-sm text-gray-500 mt-1">Start at {item.amount}$</div>
          <div className="text-xs text-gray-600 px-3 mt-2 text-center">{item.description}</div>
          {item.image && (
            <Image
              src={URL.createObjectURL(item.image)}
              alt="cover"
              width={200}
              height={120}
              className="mt-4 rounded object-cover w-48 h-24"
            />
          )}
          <button
            onClick={() => {
              setForm(item);
              setTierIndex(item);
              setIsOpen(true);
            }}
            className="absolute bottom-2 bg-[var(--color-primary)] border px-2 py-1 text-xl text-white w-[90%] rounded hover:bg-gray-100"
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
              <h2 className="text-xl font-semibold text-purple-700">Tier Type</h2>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border px-3 py-2 w-full rounded"
              />
              {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Reward description"
                rows={3}
                className="border px-3 py-2 w-full rounded"
              />
              {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}

              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="border px-3 py-2 w-full rounded"
              />
              {errors.amount && <div className="text-red-500 text-sm">{errors.amount}</div>}

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