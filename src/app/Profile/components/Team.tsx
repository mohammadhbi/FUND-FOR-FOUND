"use client";
import { client } from "@/lib/axios";
import { useEffect, useState } from "react";

interface Team {
  name: string;
  role : string;
  email: string;
  description: string;
}

export default function Team() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<Team>({
    name: "",
    role: "",
    email : "",
    description: "",
  });

  const [errors, setErrors] = useState({
     name: "",
    role: "",
    email : "",
    description: "",
  });

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

useEffect(()=>{
const postTeam = async ()=>{
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  try {
    const res = await client.post("/Teams",{
      data:{
        name: Team.name,
        role: Team.role,
        email: Team.email,
        description:Team.description,
        users_permissions_user: userId,
      },
    },
  {
    headers: {
                Authorization: `Bearer ${token}`,
              }
  });
  console.log(`Team "${Team.name}" submitted`)
  } catch (error) {
    console.error(`❌ Error submitting tier "${Team.name}":`,  error)
  }
};
if (Team.length>0){
  postTeam();
}
},[])

  return (
    <div>
      <div className="w-64 h-96 border border-gray-300 rounded-md flex flex-col items-center bg-white shadow">
        <div className="w-full h-6 bg-[var(--color-primary)] rounded-t"></div>
        <div className="mt-16 text-gray-500 text-lg">Invite Team member</div>
        <button
          className="mt-4 w-12 h-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-2xl hover:bg-purple-700"
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
        {isOpen && (
          <div className="fixed inset-0  z-[10000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 flex flex-col md:flex-row gap-6 relative z-[10000]">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              >
                &times;
              </button>

              <div className="flex-1 space-y-4">
                <h2 className="text-black">
                  Name
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

                <h2 className="text-black">
                  Role
                </h2>

                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="Admin"
                  className="border px-3 py-2 w-full rounded"
                />
                {errors.role && (
                  <div className="text-red-500 text-sm">{errors.role}</div>
                )}
   <h2 className="text-black">
                  Email Address
                </h2>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email@example.com"
                  className="border px-3 py-2 w-full rounded"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <h2 className="text-black">
                  Description
                </h2>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Reward description"
                  rows={3}
                  className="border px-3 py-2 w-full rounded"
                />
                {errors.description && (
                  <div className="text-red-500 text-sm">
                    {errors.description}
                  </div>
                )}

                


                <button
                  // onClick={handleSave}
                  className="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Save
                </button>
              </div>

              <div className="flex-1 p-4 border rounded space-y-2 bg-gray-50">
                <h3 className="text-[var(--color-primary)] font-bold text-center text-lg">
                  {form.name || "Preview Name"}
                </h3>
                <p className="text-sm text-gray-700 bg-gray-400 rounded-l-2xl rounded-r-2xl  text-center">
                   {form.role ||  "Team member" }
                </p>
                <p className="text-sm text-gray-600">
                  {form.description || "No description yet..."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
