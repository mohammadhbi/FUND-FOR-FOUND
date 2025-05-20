// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// type Brand = {
//   id: number;
//   url: string;
// };

// export default function Get() {
//   const [brands, setBrands] = useState<Brand[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         const response = await axios.get(
//           "https://my-strapi-project-lm3x.onrender.com/api/social-links"
//         );
//         const brandData = response.data?.data.map((item: any) => ({
//           id: item.id,
//           url: item.url,

//         }));
//         setBrands(brandData);
//       } catch (err) {
//         setError("Failed to fetch brand URLs.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBrands();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="space-y-2">
//       <h2 className="text-lg font-semibold">Brand URLs:</h2>
//       {brands.length === 0 ? (
//         <p>No brands found.</p>
//       ) : (
//         <ul className="list-disc pl-5">
//           {brands.map((brand) => (
//             <li key={brand.id}>
//               <a
//                 href={brand.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline"
//               >
//                 {brand.url}
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { client } from "@/lib/axios";

type SocialLink = {
  id: number;
  url: string;
};

export default function Get() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const token = localStorage.getItem("token"); // یا از context/session بگیر اگه داری

        if (!token) {
          setError("User not authenticated.");
          return;
        }

        const response = await client.get(
          "/social-links?populate=user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const allLinks = response.data?.data;

        // فقط لینک‌هایی که یوزرش موجوده (یعنی متعلق به همین کاربره)
        const userLinks = allLinks.filter(
          (item: any) => item.attributes?.user?.data
        );

        const parsed = userLinks.map((item: any) => ({
          id: item.id,
          url: item.attributes.url,
        }));

        setLinks(parsed);
      } catch (err) {
        setError("Failed to fetch social links.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Your Social Links</h2>
      {links.length === 0 ? (
        <p>You haven’t added any links yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
