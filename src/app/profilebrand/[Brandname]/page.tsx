"use client";

import { client } from "@/lib/axios";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import React from "react";
import ProfileImage from "../components/ProfileImage";
import Navbar from "../../components/Navbar";
import Contribute from "../components/Contribute";
import AddTier from "../components/AddTier";
import dynamic from "next/dynamic";
import Team from "../components/Team";
import Faq from "../components/Faq";
import Footer from "@/app/auth/components/Footer";
const Summery = dynamic(() => import("../components/Summery"), { ssr: false });


export default function Page() {
  const [isValid,setIsValid]= useState<boolean | null>(null);
const { Brandname } = useParams();

useEffect(() => {
  const brandName = localStorage.getItem("brandName");
  const token = localStorage.getItem("token");

  console.log("Brandname (from URL):", Brandname);
  console.log("brandName (from localStorage):", brandName);

  if (!brandName || !token) {
    setIsValid(false);
    return;
  }
  if (brandName !== Brandname) {
    setIsValid(false);
    return;
  }

  const fetchBrand = async () => {
    const brandId = localStorage.getItem("brandId");
    if (!brandId) {
      setIsValid(false);
      return;
    }
    try {
      const res = await client.get(`/brand-forms/?filters[users_permissions_user][id][$eq]=${brandId}&populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsValid(true);
      console.log(res);
    } catch (error) {
      console.error("Error fetching brand:", error);
      setIsValid(false);
    }
  };

  fetchBrand();
}, [Brandname]);


  if (isValid === null) {
    return <h1>Loading...</h1>;
  }

  if (!isValid) {
    return <h1>Unauthorized: BrandName mismatch or invalid token</h1>;
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <ProfileImage />
      <div className="mt-20 ">
        <Contribute />
        <AddTier />
        <Summery />
        <Team/>
        <Faq/>
      </div>
      <Footer/>
    </div>
  )
}
