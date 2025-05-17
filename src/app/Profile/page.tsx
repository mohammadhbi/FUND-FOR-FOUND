"use client";
import React from "react";
import ProfileImage from "./components/ProfileImage";
import Navbar from "../components/Navbar";
import Contribute from "./components/Contribute";
import AddTier from "./components/AddTier";
export default function page() {
  return (
    <div className="flex flex-col">
  <Navbar />
  <ProfileImage />
 <div className="mt-20">
  <Contribute/>
  <AddTier/>
 </div>

</div>

  );
}
