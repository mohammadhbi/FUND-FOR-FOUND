"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface BrandContextType {
  brandId: string | null;
  setBrandId: (id: string | null) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brandId, setBrandId] = useState<string | null>(null);

  return (
    <BrandContext.Provider value={{ brandId, setBrandId }}>
      {children}
    </BrandContext.Provider>
  );
}

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
};