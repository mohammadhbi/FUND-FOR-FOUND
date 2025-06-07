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

const handleEdit = async ()=>{
  const brandId = localStorage.getItem("brandId")
  console.log(brandId);
  
}

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
    handleEdit();
  }, []);

  if (loading) return (<div className="flex justify-center items-center h-24">
      <div className="w-6 h-6 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
    </div>);
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4 flex items-center gap-3 flex-row absolute ">
      {links.length === 0 ? (
        <p>you dont have any social media !!</p>
      ) : (
        <ul className="space-y-2 flex items-center gap-3">
          {links.map((link) => {
            const Icon = socialIcons[link.social] || <FaLink />;

            return (
              <li key={link.id} className="text-gray-500">
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl"
                >
                  {Icon}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <button className="left-15 mb-3 bg-[var(--color-primary-75)] text-[var(--color-primary)] px-2 py-1 rounded text-xs flex  justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
        Edit
      </button>
    </div>
  );
}
