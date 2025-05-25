"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/axios";
import Link from "next/link";
import {
  FaGlobe,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaDiscord,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaLinkedin,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaLink,
} from "react-icons/fa";
type SocialLink = {
  id: number;
  url: string;
  documentId: string;
  social: string;
};

const socialIcons: { [key: string]: JSX.ELement } = {
  Website: <FaGlobe />,
  Youtube: <FaYoutube />,
  Instagram: <FaInstagram />,
  Twitter: <FaTwitter />,
  Discord: <FaDiscord />,
  Whatsapp: <FaWhatsapp />,
  Telegram: <FaTelegram />,
  Facebook: <FaFacebook />,
  Linkedin: <FaLinkedin />,
  Times: <FaTimes />,
  ChevronDown: <FaChevronDown />,
  FaChevronUp: <FaChevronUp />,
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
        // console.log("userId:", userId);
        // console.log("Full response:", res.data);
        // console.log("Extracted data:", res.data.data);

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
      {links.length === 0 ? (
        <p>you dont have any social media !!</p>
      ) : (
        <ul className="space-y-2">
          {links.map((link) => {
            const Icon = socialIcons[link.social] || <FaLink />;

            return (
              <li key={link.id}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-blue-600 hover:text-blue-800"
                >
                  {Icon}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
