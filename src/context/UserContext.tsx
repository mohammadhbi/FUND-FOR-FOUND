"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { client } from "@/lib/axios";

type UserContextType = {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    async function fetchUser() {
        const token = localStorage.getItem("token");
      try {
        const res = await client.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsername(res.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
