import { client } from "@/lib/axios";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
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
} from "react-icons/fa";
import { toast } from "react-toastify";

const SOCIALS = [
  {
    label: "Website",
    value: "Website",
    icon: <FaGlobe />,
    placeholder: "https://yourwebsite.com",
  },
  {
    label: "YouTube",
    value: "YouTube",
    icon: <FaYoutube />,
    placeholder: "https://youtube.com/yourchannel",
  },
  {
    label: "Instagram",
    value: "Instagram",
    icon: <FaInstagram />,
    placeholder: "https://instagram.com/yourusername",
  },
  {
    label: "Twitter",
    value: "Twitter",
    icon: <FaTwitter />,
    placeholder: "https://twitter.com/yourusername",
  },
  {
    label: "Discord",
    value: "Discord",
    icon: <FaDiscord />,
    placeholder: "https://discord.gg/yourserver",
  },
  {
    label: "Whatsapp",
    value: "Whatsapp",
    icon: <FaWhatsapp />,
    placeholder: "https://wa.me/yourphonenumber",
  },
  {
    label: "Telegram",
    value: "Telegram",
    icon: <FaTelegram />,
    placeholder: "https://t.me/yourusername",
  },
  {
    label: "Facebook",
    value: "Facebook",
    icon: <FaFacebook />,
    placeholder: "https://facebook.com/yourusername",
  },
  {
    label: "Linkedin",
    value: "Linkedin",
    icon: <FaLinkedin />,
    placeholder: "https://linkedin.com/in/yourusername",
  },
] as const;

type SocialType = (typeof SOCIALS)[number];
type SocialLink = {
  type: SocialType;
  url: string;
};

interface SocialMediaProps {
  onChange?: (links: SocialLink[]) => void;
}

export default function SocialMedia({ onChange }: SocialMediaProps) {
  const [links, setLinks] = useState<SocialLink[]>([
    { type: SOCIALS[0], url: "" },
  ]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);
  const router = useRouter();
  const ensureHttp = (url: string) =>
    url.startsWith("https://") ? url : "https://" + url;
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        openDropdown !== null &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown]?.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openDropdown]);

  const handleTypeChange = (idx: number, value: string) => {
    const social = SOCIALS.find((s) => s.value === value) || SOCIALS[0];
    setLinks(
      links.map((row, i) => (i === idx ? { ...row, type: social } : row))
    );
    setOpenDropdown(null);
  };

  const handleUrlChange = (idx: number, value: string) => {
    setLinks(links.map((row, i) => (i === idx ? { ...row, url: value } : row)));
  };

  const handleRemove = (idx: number) => {
    setLinks(links.filter((_, i) => i !== idx));
  };

  const handleAdd = () => {
    setLinks([...links, { type: SOCIALS[0], url: "" }]);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    try {
      const validLinks = links.filter((link) => link.url?.trim());

      for (const link of validLinks) {
        const payload = {
          data: {
            socials: link.type.value, 
            url: ensureHttp(link.url.trim()),
            users_permissions_user: Number(userId), 
          },
        };

        console.log(
          "📤 Sending payload to Strapi:",
          JSON.stringify(payload, null, 2)
        );

        const response = await client.post(
          "/social-links",
          payload
        );

        console.log("✅ Success:", response.data);
      }

      toast.success("Social links submitted!");
      router.push("/createbrand/IntroBrand/Success");
    } catch (error) {
      console.error(
        "❌ Error submitting social links:",
        error.response?.data || error
      );
      toast.error("Failed to submit social links");
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(links);
    }
  }, [links]);
  return (
    <div className="w-full max-w-[200px] lg:max-w-2xl mx-auto flex flex-col gap-4 mt-8">
      {links.map((item, idx) => (
        <div
          key={idx}
          className="relative flex flex-col w-full gap-0 mb-6 lg:flex-row lg:items-center lg:gap-2 lg:mb-0"
        >
          <div className="w-full mb-2 lg:w-40 lg:mb-0">
            <button
              type="button"
              className="w-full flex items-center justify-between border cursor-pointer border-[rgba(141,117,247,1)] rounded-lg px-4 py-2 bg-white focus:outline-none"
              onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
            >
              <span className="flex items-center gap-2">
                {item.type.icon}
                {item.type.label}
              </span>
              {openDropdown === idx ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openDropdown === idx && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-[rgba(141,117,247,1)] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {SOCIALS.map((s) => (
                  <button
                    key={s.value}
                    className={`w-full flex items-center gap-2 px-4 cursor-pointer py-2 hover:bg-purple-50 text-left ${
                      item.type.value === s.value ? "bg-purple-50" : ""
                    }`}
                    onClick={() => handleTypeChange(idx, s.value)}
                    type="button"
                  >
                    {s.icon}
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Input */}
          <input
            className="w-full border border-[rgba(141,117,247,1)] rounded-lg px-4 py-2 focus:outline-none focus:ring-[rgba(141,117,247,1)] mb-2 lg:mb-0 lg:flex-1"
            placeholder={item.type.placeholder}
            value={item.url}
            onChange={(e) => handleUrlChange(idx, e.target.value)}
            type="url"
          />

          <button
            className="absolute top-16 -right-7 text-gray-400 cursor-pointer hover:text-red-500 transition-colors lg:static lg:ml-2"
            onClick={() => handleRemove(idx)}
            aria-label="Remove"
            type="button"
          >
            <FaTimes size={18} />
          </button>
        </div>
      ))}
      <button
        className="mt-4 w-full self-center px-6 py-2 rounded-md border border-[rgba(199,198,198,1)] cursor-pointer bg-[rgba(245,245,245,1)] text-[rgba(113,113,113,1)] hover:bg-[rgba(199,198,198,1.5)] transition lg:w-fit"
        type="button"
        onClick={handleAdd}
      >
        + Add social link
      </button>
      <button
        onClick={handleSubmit}
        className="mt-2 w-full self-center px-6 py-2 rounded-md border border-purple-500 bg-purple-600 text-white hover:bg-purple-700 transition lg:w-fit"
      >
        Send
      </button>
    </div>
  );
}
