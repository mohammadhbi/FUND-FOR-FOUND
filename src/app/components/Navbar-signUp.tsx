"use client";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logosignup from "../../../public/logosignup.png";
const navItems = [
  { name: "Home", href: "/" },
  { name: "Brand and organization", href: "/explore" },
  { name: "About Us", href: "/about" },
  { name: "Help & Support", href: "/help" },
];

export default function NavbarsignUp() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="ml-3.5">
      <nav className="w-full flex justify-around items-center top-0 bg-background/70 backdrop-blur-lg h-[4rem] px-4 z-50 border-b border-b-[var(--color-primary-100)]">
        <div className="container mx-auto flex items-center justify-between h-full relative">
          <div className="text-xl font-bold text-foreground ml-4">
            <Link href="/">
              <Image src={logosignup} width={30} height={30} alt="logo" />
            </Link>
          </div>

          <ul className="hidden md:flex gap-5 items-center text-sm text-gray-3 absolute left-1/3 -translate-x-1/2">
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white w-64 h-screen absolute top-[4rem] right-0 shadow-lg">
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
    </div>
  );
}
