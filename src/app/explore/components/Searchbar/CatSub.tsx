"use client";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

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

export default function CatSub() {
  const [openMenu, setOpenMenu] = useState<string | null>(null); 
const[isOpen,setIsOpen] = useState(false);


  const toggleMenu = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  return (
    <div className="mx-auto w-[90%]  rounded-b-4xl shadow-[0_10px_15px_-5px_rgba(0,0,0,0.3),-5px_0_15px_-5px_rgba(0,0,0,0.3),5px_0_15px_-5px_rgba(0,0,0,0.3)]">
      <p className="text-2xl text-[var(--color-primary)] flex justify-center">
        Categories & Subcategories
      </p>
      <div className="flex text-2xs gap-3 justify-center">
        {categories.map((category) => (
          <div
            key={category.title}
            className="border-[var(--color-primary)]  text-[var(--color-primary)]flex bg-gray-200 rounded text-xs relative"
          >
            <button
              onClick={() => toggleMenu(category.title)}
              className="px-2 py-1 flex-1 text-center text-[var(--color-primary)]"
            >
              {category.title}
            </button>
            {openMenu === category.title && (
              <div className="absolute left-0 text-[var(--color-primary)] w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {category.items.map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-[var(--color-primary)] "
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10 gap-4 pb-4">
        <div  className="border-[var(--color-primary)] text-[var(--color-primary)] p-1 px-1.5 bg-gray-200 rounded text-xs">
          Most funded
          <div className="mt-0.75"></div>
        </div>
        <div onClick={()=>setIsOpen(!isOpen)} className="flex text-[var(--color-primary)] border-[var(--color-primary)] p-1 px-1.5 bg-gray-200 rounded text-xs">
          Country
          <div className="pl-0.5 mt-0.75"> {isOpen ? <FaAngleUp /> : <FaAngleDown />}</div>
        </div>
        {isOpen && (<div>

        </div>)}
      </div>
    </div>
  );
}