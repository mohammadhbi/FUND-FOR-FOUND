// "use client";
// import React, { createContext, useContext, useState, useEffect } from "react";

// type UserContextType = {
//   username: string | null;
//   setUsername: React.Dispatch<React.SetStateAction<string | null>>;
// };

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [username, setUsername] = useState<string | null>(null);
//   useEffect(() => {
//     async function fetchUser() {
//       const res = await fetch("/api/user");
//       if (res.ok) {
//         const data = await res.json();
//         setUsername(data.username);
//       }
//     }
//     fetchUser();
//   }, []);
//   return (
//     <UserContext.Provider value={{ username, setUsername }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within UserProvider");
//   }
//   return context;
// };
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type UserContextType = {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("https://my-strapi-project-lm3x.onrender.com/api/user");
        // فرض کردم username توی res.data.username هست، اگه ساختار فرق داره تغییر بده
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
