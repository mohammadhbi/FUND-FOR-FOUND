"use client";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const categories = [
  {
    title: "Technology & Innovation",
    items: [
      "Software & Apps",
      "Consumer Electronics",
      "Green Tech & Sustainability",
      "Blockchain & Health Tech",
      "Others",
    ],
  },
  {
    title: "Creative art & media",
    items: [
      "Visual Arts & Design",
      "Film, Video & Animation",
      "Music & Audio",
      "Performing Arts & Theater",
      "Fashion & Wearable Art",
      "Writing & Publishing",
      "Others",
    ],
  },
  {
    title: "Business & Entrepreneurship",
    items: [
      "Startups & Small Businesses",
      "E-commerce & Digital Businesses",
      "Consulting & Professional Services",
      "Marketing & Sales",
      "Others",
    ],
  },
  {
    title: "Games & Entertainment",
    items: [
      "Video Games",
      "Table Top & Board Games",
      "Interactive Media & VR/AR",
      "Live Events & Performances",
      "Sports & Competitive Gaming",
      "Others",
    ],
  },
  {
    title: "Social Causes & Community",
    items: [
      "Environmental & Sustainability Initiatives",
      "Community Development",
      "Education & Youth Empowerment",
      "Health & Wellness",
      "Animal Welfare & Conservation",
      "Others",
    ],
  },
];


const additionalFilters = [
  {
    title: "Sort by",
    items: ["Most funded", "Reward price (Lowest)", "Reward price (Highest)", "Newest"],
  },
  {
    title: "Country",
    items: ["All country","Iran", "USA", "UAE", "UK"],
  },
];

export default function CatSub() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  return (
    <div className="mx-auto w-[90%] rounded-b-4xl shadow-[0_10px_15px_-5px_rgba(0,0,0,0.3),-5px_0_15px_-5px_rgba(0,0,0,0.3),5px_0_15px_-5px_rgba(0,0,0,0.3)]">
      <p className="text-2xl text-[var(--color-primary)] flex justify-center py-4">
        Categories & Subcategories
      </p>
      
      <div className="flex justify-center gap-2 mb-6">
        {categories.map((category) => (
          <div
            key={category.title}
            className="relative"
          >
            <button
              onClick={() => toggleMenu(category.title)}
              className="text-[11px] py-1 px-0.5 text-[var(--color-primary)] bg-gray-200 rounded-md hover:bg-opacity-90 focus:outline-none"
            >
              {category.title}
            </button>
            {openMenu === category.title && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {category.items.map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 text-[var(--color-primary)] hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center gap-4 pb-2">
        {additionalFilters.map((filter) => (
          <div
            key={filter.title}
            className="relative"
          >
            <button
              onClick={() => toggleMenu(filter.title)}
              className="text-[11px] py-1 px-1.5 text-[var(--color-primary)] bg-gray-200 rounded-md hover:bg-opacity-90 focus:outline-none flex items-center"
            >
              {filter.title}
              <span className="ml-2">
                {openMenu === filter.title ? <FaAngleUp /> : <FaAngleDown />}
              </span>
            </button>
            {openMenu === filter.title && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {filter.items.map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 text-[var(--color-primary)] hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}