"use client";
import { useEffect, useState } from "react";
import { client } from "@/lib/axios";
import "react-toastify/dist/ReactToastify.css";
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
  const [teams, setTeams] = useState<TeamData[]>([]);

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
              
            </div>
          );
        })}
    </div>
    </div>
  );
}
