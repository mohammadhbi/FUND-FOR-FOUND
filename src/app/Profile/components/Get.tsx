// import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";

// interface SocialLink {
//   type: string;
//   url: string;
// }

// interface RawSocialLink {
//   id : number;
//   type : string;
//   url : string;
//   key? : string;
// }

// export default function SocialMediaList() {
//   const [socials, setSocials] = useState<SocialLink[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       console.error("User not found in localStorage");
//       return;
//     }

//     const fetchSocialLinks = async () => {
//       try {
//         // const res = await axios.get(
//         //   `https://my-strapi-project-lm3x.onrender.com/api/social-links?filters[user][id][$eq]=${userId}`
//         // );
//         const res = await axios.get(
//           "https://my-strapi-project-lm3x.onrender.com/api/social-links?populate=*"
//         );
//         console.log("Raw API response:", res.data);
//         console.log("Data array:", res.data.data);

//         const rawData : RawSocialLink[] = res.data
//         // const links = res.data.data.map((item: any) => ({
//         //   type: item.attributes.type,
//         //   url: item.attributes.url,
//         // }));
//         const links = res.data.data.map((item: any) => ({
//           type: item.type || "Unknown",
//           url: item.url || "#",
//         }));

//         setSocials(links);
//       } catch (error) {
//         console.error("Error fetching social links:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSocialLinks();
//   }, []);

//   if (loading) return <p>Loading social links...</p>;

//   return (
//     <div className="flex flex-wrap gap-4">
//       {socials.map((link, index) => (
//         <Link
//           key={index}
//           href={link.url}
//           className="text-blue-600 hover:underline"
//         >
//           {link.type}
//         </Link>
//       ))}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

// مدل نهایی که توی کامپوننت استفاده می‌کنی
interface SocialLink {
  id: number;
  type: string;
  url: string;
}

// مدل کامل برگشتی از API
interface RawSocialLink {
  id: number;
  attributes: {
    type: string;
    url: string;
    user: {
      data: {
        id: number;
      } | null;
    };
  };
}

export default function SocialMediaList() {
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User not found in localStorage");
      setLoading(false);
      return;
    }

    const fetchSocialLinks = async () => {
      try {
        const res = await axios.get(
          "https://my-strapi-project-lm3x.onrender.com/api/social-links"
        );
console.log(res.data);
        const rawData: RawSocialLink[] = res.data.data;
console.log(rawData);

        const links: SocialLink[] = rawData
          .filter(
            (item) =>
              item.attributes.user?.data?.id?.toString() === userId &&
              typeof item.attributes.type === "string" &&
              typeof item.attributes.url === "string"
          )
          .map((item) => ({
            id: item.id,
            type: item.attributes.type,
            url: item.attributes.url,
          }));

        setSocials(links);
      } catch (error) {
        console.error("Error fetching social links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  if (loading) return <p>Loading social links...</p>;

  return (
    <div className="flex flex-wrap gap-4">
      {socials.map((link) => (
        <Link key={link.id} href={link.url} className="text-blue-600 hover:underline">
          {link.type}
        </Link>
      ))}
    </div>
  );
}
