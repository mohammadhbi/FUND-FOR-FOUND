"use client";
import React from "react";
import ProfileImage from "./components/ProfileImage";
import Navbar from "../components/Navbar";
import Contribute from "./components/Contribute";
export default function page() {
  return (
    <div className="flex flex-col">
  <Navbar />
  <ProfileImage />
 <div className="mt-20">
  <Contribute/>
 </div>

</div>

  );
}
