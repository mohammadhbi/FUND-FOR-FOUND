"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/axios";
import Link from "next/link";
type SocialLink = {
  id: number;
  url: string;
  documentId: string;
};

export default function Get() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          setError("User not authenticated.");
          return;
        }

        const res = await client.get(
          `/social-links?filters[users_permissions_user][id][$eq]=${userId}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const userSocials = res.data.data || [];
        console.log("userId:", userId);
        console.log("Full response:", res.data);
        console.log("Extracted data:", res.data.data);

        setLinks(userSocials);
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
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">your social media</h2>
      {links.length === 0 ? (
        <p>you dont have any social media !!</p>
      ) : (
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.id} className="flex items-center gap-2">
             
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link.url}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
