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
    <nav className="w-full sticky top-0 bg-background/70 backdrop-blur-lg h-[4rem] px-4 z-50">
      <div className="container mx-auto flex items-center justify-end h-full">
        <ul className="hidden md:flex gap-5 items-center justify-center text-sm text-gray-3 absolute left-1/2 transform -translate-x-1/2">
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

        <button
          className="md:hidden focus:outline-none"
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

      {isOpen && (
        <div className="md:hidden bg-white w-64 h-screen absolute top-[4rem] right-0 shadow-lg">
          <ul className="flex flex-col items-start gap-4   justify-center text-sm text-gray-3">
            {navItems.map((item) => (
              <li
                key={item.href}
                className="text-medium  whitespace-nowrap  gap-x-3"
              >
                <Link
                  href={item.href}
                  className="text-foreground text-start hover:opacity-80 transition-opacity pr-6"
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
