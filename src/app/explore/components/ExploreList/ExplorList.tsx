"use client";
import { client } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Brand {
  id: number;
  Brandname: string;
}

export default function ExploreList() {
  const {
    data: brands,
    isLoading,
    error,
  } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: () =>
      client.get("/brand-forms").then((res) => {
        const result = res.data;
        if (Array.isArray(result)) return result;
        if (result.data && Array.isArray(result.data)) return result.data;
        throw new Error("Invalid data format from API");
      }),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-[var(--color-primary)] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Failed to fetch brands. Please try again.
      </div>
    );
  }

  if (!brands || brands.length === 0) {
    return <div className="text-center py-4">No brands found.</div>;
  }

  return (
    <div className="mx-auto w-[90%] py-4">
      <h1 className="text-2xl text-[var(--color-primary)] text-center mb-4">
        Explore
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="border border-[var(--color-primary)] p-4 rounded-lg shadow-md"
          >
            <Link href={`/profilebrand/${brand.Brandname}`}>
              <h2 className="text-[var(--color-primary)] font-semibold">
                {brand.Brandname}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
