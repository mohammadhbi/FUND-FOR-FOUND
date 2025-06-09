"use client";
import { useEffect, useState } from "react";
import { client } from "@/lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TeamForm {
  name: string;
  role: string;
  email: string;
  description: string;
}

interface TeamData {
  id: number;
  documentId: string;
  name: string;
  role: string;
  email: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function Team() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<TeamForm>({
    name: "",
    role: "",
    email: "",
    description: "",
  });
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [errors, setErrors] = useState({
    name: "",
    role: "",
    email: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!form.name || !form.role || !form.email) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      await client.post(
        "/Teams",
        {
          data: {
            ...form,
            users_permissions_user: userId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`✅ Team member "${form.name}" added successfully`);
      setIsOpen(false);
      setForm({ name: "", role: "", email: "", description: "" });
      await fetchTeam();
    } catch (error) {
      toast.error("❌ Failed to add team member");
      console.error(error);
      console.log(errors);
    }
  };

  const fetchTeam = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await client.get(
        `/teams?filters[users_permissions_user][id][$eq]=${userId}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTeams(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4  w-max">
        {teams.map((team) => {
          return (
            <div
              key={team.id}
              className="w-64 h-96 border border-gray-300  rounded-md flex flex-col items-center  shadow relative"
            >
              <div className="w-full h-6 bg-[var(--color-primary)] rounded-t"></div>
              <div className="mt-6 text-[var(--color-primary)] font-semibold text-lg">
                {team.name}
              </div>
              <div className="text-sm text-gray-500 mt-1">{team.role}</div>
              <div className="text-xs text-gray-600 px-3 mt-2 text-center">
                {team.description}
              </div>
              <button
                onClick={() => {
                  setForm({
                    name: team.name,
                    role: team.role,
                    email: team.email,
                    description: team.description,
                  });
                  setIsOpen(true);
                }}
                className="absolute bottom-2 bg-[var(--color-primary)] px-2 py-1 text-sm text-white w-[90%] rounded hover:bg-purple-700"
              >
                Edit Team
              </button>
            </div>
          );
        })}
            <div className="w-64 h-96 border border-gray-300 rounded-md flex flex-col items-center bg-white shadow">
        <div className="w-full h-6 bg-[var(--color-primary)] rounded-t"></div>
        <div className="mt-16 text-gray-500 text-lg">Invite Team member</div>
        <button
          className="mt-4 w-12 h-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-2xl hover:bg-purple-700"
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
      </div>
      </div>

  

      {isOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 flex flex-col md:flex-row gap-6 relative z-[10000]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>

            <div className="flex-1 space-y-4">
              <label className="text-black">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border px-3 py-2 w-full rounded"
              />

              <label className="text-black">Role</label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Admin"
                className="border px-3 py-2 w-full rounded"
              />

              <label className="text-black">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email@example.com"
                className="border px-3 py-2 w-full rounded"
              />

              <label className="text-black">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Short description"
                rows={3}
                className="border px-3 py-2 w-full rounded"
              />

              <button
                onClick={handleSave}
                className="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Save
              </button>
            </div>

            <div className="flex-1 p-4 border rounded space-y-2 bg-gray-50">
              <h3 className="text-[var(--color-primary)] font-bold text-center text-lg">
                {form.name || "Preview Name"}
              </h3>
              <p className="text-sm text-gray-700 bg-gray-400 rounded-l-2xl rounded-r-2xl text-center">
                {form.role || "Team member"}
              </p>
              <p className="text-sm text-gray-600">
                {form.description || "No description yet..."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
