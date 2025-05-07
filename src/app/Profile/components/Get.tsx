import { useEffect, useState } from "react";
import axios from "axios";

interface SocialLink {
  type: string;
  url: string;
}

export default function SocialMediaList() {
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User not found in localStorage");
      return;
    }

    const fetchSocialLinks = async () => {
      try {
        
        const res = await axios.get(
          `https://my-strapi-project-lm3x.onrender.com/api/social-links?filters[user][id][$eq]=${userId}`
        );

        const links = res.data.data.map((item: any) => ({
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
      {socials.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {link.type}
        </a>
      ))}
    </div>
  );
}
