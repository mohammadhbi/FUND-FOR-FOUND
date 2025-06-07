"use client";

import { useState } from "react";
import Info from "./Info";
import Contributions from "./Contributions";
import About from "./About";
//import EditorComponent from "./EditorComponent";

const SideBarItem = [
  { name: "Info" },
  { name: "Contributions Tiers" },
  { name: "About" },
  { name: "Team" },
  { name: "Updates" },
  { name: "Expenses" },
  { name: "Pay out" },
];


const ContentComponents = {
  "Info": () => <div><Info/></div>,
  "Contributions Tiers": () => <div><Contributions/></div>,
  "About": () => <div><About/></div>,
  "Team": () => <div>Team</div>,
  "Updates": () => <div>Updates</div>,
  "Expenses": () => <div>Expenses</div>,
  "Pay out": () => <div>Pay out</div>,
};

export default function SideBar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setActiveSection(name); 
  };

  return (
    <div className="flex h-screen">
    
      <div className="w-1/4 bg-gray-200 p-4 rounded-2xl h-3/4">
        <p className="text-bold mb-1 text-[var(--color-primary)] ml-1.5">FUND FOR FOUND</p>
        <p className="ml-1.5">Public Profile</p>
        <ul className="ml-1.5">
          {SideBarItem.map((item) => (
            <li key={item.name} className="mb-2">
              <button
                onClick={() => handleClick(item.name)}
                className={`text-left w-full py-2 hover:text-[var(--color-primary)] ${
                  activeSection === item.name ? "font-bold" : ""
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      
      <div className="w-3/4 p-6 bg-white">
        {activeSection && (
          <div className="p-4  rounded">
             {ContentComponents[activeSection]()} 
          </div>
        )}

      </div>
    </div>
  );
}