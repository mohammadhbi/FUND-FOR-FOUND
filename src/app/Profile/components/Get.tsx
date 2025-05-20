"use client";

import { useEffect, useState } from "react";
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
        const token = localStorage.getItem("token");

        if (!token) {
          setError("User not authenticated.");
          return;
        }
        console.log("Token: ", token);
        console.log(
          "Final URL: ",
          "/social-links?populate=users_permissions_user"
        );

        // const response = await client.get(
        //   "/social-links?populate=users_permissions_user",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        const response = await client.get("/users?populate=social_links,role", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

     

        console.log(response.data);

        const allLinks = response.data?.data;

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
