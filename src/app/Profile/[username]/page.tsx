"use client";
import React from "react";
import ProfileImage from "../components/ProfileImage";
import Navbar from "../../components/Navbar";
import Contribute from "../components/Contribute";
import AddTier from "../components/AddTier";
import dynamic from "next/dynamic";
import Team from "../components/Team";
import Faq from "../components/Faq";
const Summery = dynamic(() => import("../components/Summery"), { ssr: false });

export default function page() {
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
    </div>
  );
}
