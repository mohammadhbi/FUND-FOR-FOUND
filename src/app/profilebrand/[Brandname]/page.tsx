"use client";

import { client } from "@/lib/axios";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import React from "react";
import ProfileImage from "../components/Authenticated/Profile images/ProfileImage"
import Navbar from "../../components/Navbars component/Navbar";
import Contribute from "../components/Authenticated/Contribute/Contribute";
import AddTier from "../components/Authenticated/Tier/AddTier";
import dynamic from "next/dynamic";
import Team from "../components/Authenticated/Team/Team";
import Faq from "../components/Authenticated/Faq/Faq";
import Footer from "@/app/auth/components/Footer";
import PublicComponent from "../components/PublicComponent";
const Summery = dynamic(() => import("../components/Authenticated/summery/Summery"), { ssr: false });


export default function Page() {
  const [isValid,setIsValid]= useState<boolean | null>(null);
const { Brandname } = useParams();

useEffect(() => {


  
  const brandName = localStorage.getItem("brandName");
  const token = localStorage.getItem("token");

  //console.log("Brandname (from URL):", Brandname);
 // console.log("brandName (from localStorage):", brandName);

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
    return <div className="flex items-center justify-center">
  <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
</div>;
  }

  if (!isValid) {
    return <div>
      <PublicComponent/>
    </div>;
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







// "use client";
// import { client } from "@/lib/axios";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import React from "react";
// import ProfileImage from "../components/Authenticated/Profile images/ProfileImage";
// import Navbar from "../../components/Navbars component/Navbar";
// import Contribute from "../components/Authenticated/Contribute/Contribute";
// import AddTier from "../components/Authenticated/Tier/AddTier";
// import dynamic from "next/dynamic";
// import Team from "../components/Authenticated/Team/Team";
// import Faq from "../components/Authenticated/Faq/Faq";
// import Footer from "@/app/auth/components/Footer";
// import PublicComponent from "../components/PublicComponent";
// const Summery = dynamic(() => import("../components/Authenticated/summery/Summery"), { ssr: false });

// export default function Page() {
//   const [isValid, setIsValid] = useState<boolean | null>(null);
//   const { Brandname } = useParams();

//   useEffect(() => {
//     const brandName = localStorage.getItem("brandName");
//     const token = localStorage.getItem("token");

//     if (!brandName || !token) {
//       setIsValid(false);
//       return;
//     }
//     if (brandName !== Brandname) {
//       setIsValid(false);
//       return;
//     }

//     const fetchBrand = async () => {
//       const brandId = localStorage.getItem("brandId");
//       if (!brandId) {
//         setIsValid(false);
//         return;
//       }

//       try {
//         const res = await client.get(`/brand-forms/?filters[Brandname][$eq]=${encodeURIComponent(Brandname)}&populate=*`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = res.data;
//         console.log("API Response:", result); 

//                 if (Array.isArray(result.data) && result.data.length > 0 && result.data[0].Brandname === Brandname) {
//           setIsValid(true);
//         } else {
//           setIsValid(false);
//         }
//       } catch (error) {
//         console.error("Error fetching brand:", error);
//         setIsValid(false);
//       }
//     };

//     fetchBrand();
//   }, [Brandname]);

//   if (isValid === null) {
//     return <div className="flex items-center justify-center">
//       <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
//     </div>;
//   }

//   if (!isValid) {
//     return <div><PublicComponent /></div>;
//   }

//   return (
//     <div className="flex flex-col">
//       <Navbar />
//       <ProfileImage />
//       <div className="mt-20 ">
//         <Contribute />
//         <AddTier />
//         <Summery />
//         <Team />
//         <Faq />
//       </div>
//       <Footer />
//     </div>
//   );
// }