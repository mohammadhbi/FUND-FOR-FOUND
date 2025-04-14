"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "About Us", href: "/about" },
  { name: "Help & Support", href: "/help" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full flex justify-center sticky top-0 bg-background/70 backdrop-blur-lg h-[4rem] px-4 z-50">
      <div className="container mx-auto flex items-center justify-center h-full relative">
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-5 items-center text-sm text-gray-3">
          {navItems.map((item) => (
            <li key={item.href} className="text-medium whitespace-nowrap">
              <Link
                href={item.href}
                className="text-foreground hover:opacity-80 transition-opacity"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Button */}
        <button
          className="md:hidden absolute right-0 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-foreground" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white w-64 h-screen absolute top-[4rem] right-1 shadow-lg">
          <ul className="flex flex-col items-start gap-4 text-sm text-gray-3 p-6">
            {navItems.map((item) => (
              <li key={item.href} className="text-medium whitespace-nowrap">
                <Link
                  href={item.href}
                  className="text-foreground text-start hover:opacity-80 transition-opacity"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
