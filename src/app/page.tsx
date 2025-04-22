"use client";
import NavbarHome from "./components/NavbarHome";
import Image from "next/image";
import Bag from "../../public/Bag.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "./auth/components/Footer";
function HomePage() {
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token){
      setIsLoggedIn(true);
    }
  },[]);
  return (
    <div>
      <NavbarHome />
      <div className="pt-16 flex flex-col justify-center items-center">
        <div className="flex flex-col mt-6 gap-y-2.5 justify-center w-[90%] lg:w-[60%] text-center lg:mx-auto max-[1024px]:text-left">
          <p className="lg:mx-auto max-[1024px]:text-center text-[var(--color-primary)] text-3xl">
            Create your profile and take the first step towards new
            opportunities
          </p>
          <p className="lg:ml-1.5 text-[var(--color-gray-4)]">
            By creating your account, youll gain access to a thriving community
            where brands and individuals are committed to offering you ongoing
            support. This support network will empower you with the resources,
            guidance, and connections you need to succeed, ensuring that you`re
            never alone on your journey
          </p>
        </div>
        <div className="mt-4 w-80 h-96 border border-[var(--color-primary)] rounded-3xl flex flex-col  items-center">
          <Image className="mt-14" src={Bag} width={77} height={60} alt="Start now" />
          <p className="text-[var(--color-primary)] text-3xl pt-10">Brand or organization</p>
         <div className="ml-4.5 pt-2.5">
         <p className="text-start text-[var(--color-gray-4)] text-m">
            If your brand is established and you`re looking for continuos
            support, get start now.
          </p>
         </div>
         
          <span className="bg-[var(--color-primary)] text-white py-2.5 rounded min-w-64 text-center mt-2.5">
          <Link href={isLoggedIn ? '/createbrand': '/auth/signup'}>
          Start
          </Link>
          </span>
          <span className="text-[var(--color-primary)]  pb-2.5 pt-2.5 mb-3 rounded min-w-64 text-center mt-2.5">
          <Link href="/learnmore">
          learn more
          </Link>
          </span>
        
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default HomePage;
