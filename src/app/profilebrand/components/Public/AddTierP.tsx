"use client";
import { useEffect, useState } from "react";
import { client } from "@/lib/axios";

interface Tier {
  name: string;
  description: string;
  amount: string;
  coverPhoto: File | null;
  item :{
    name: string;
  }
}

interface TierFromApi {
  id: number;
   
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


export default function AddTier() {
  const [tiers, setTiers] = useState<Tier[]>([]);
 const [apiTiers,setTierApi]=useState<TierFromApi[]>([])

 console.log(setTiers);
  useEffect(() => {
    const fetchTiers =async () =>{
      try {
        const res = await client.get("/tiers?populate=*");
        setTierApi(res.data.data);
        console.log(res.data.data)
      } catch (error) {
        console.error("error:",error);
      }
    }
   
    fetchTiers()
  }, [tiers]);

  return (
   <div className="overflow-x-auto">
      <div className="flex gap-4  w-max">
      {apiTiers.map((item) => (
        <div key={item.id} className="w-64 h-96 border border-gray-300  rounded-md flex flex-col items-center  shadow relative">
          <div className="w-full h-6 bg-[var(--color-primary)] rounded-t"></div>
          <div className="mt-6 text-[var(--color-primary)] font-semibold text-lg">{item.name}</div>
          <div className="text-sm text-gray-500 mt-1">Start at {item.amount}$</div>
          <div className="text-xs text-gray-600 px-3 mt-2 text-center">{item.description}</div>
        </div>
      ))}
    </div>
    </div>
  );
}