"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/axios";
import
type SocialLink = {
  id: number;
  attributes: {
    social: string;
    url: string;
  }
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

        const response = await client.get(`/api/users/${userId}`, {
        
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userSocials = response.data.socials?.data || [];
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

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">شبکه‌های اجتماعی شما</h2>
      {links.length === 0 ? (
        <p>هنوز هیچ لینکی اضافه نکرده‌اید.</p>
      ) : (
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.id} className="flex items-center gap-2">
              <span className="font-medium">{link.attributes.social}:</span>
              <a
                href={link.attributes.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link.attributes.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}