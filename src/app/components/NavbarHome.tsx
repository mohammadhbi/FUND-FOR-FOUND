"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import logosignup from "../../../public/logosignup.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Brand and organization", href: "/explore" },
  { name: "About Us", href: "/about" },
  { name: "Help & Support", href: "/help" },
];

export default function NavbarHome() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
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

          <ul className="hidden lg:flex gap-5 items-center text-sm text-gray-3 absolute left-1/3 -translate-x-1/2">
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

          <div className="flex items-center space-x-2">
            <div className="hidden lg:block relative w-48 lg:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search brand, category, tag..."
                className="w-full pl-10 pr-4 py-1.5 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-gray-700 text-sm"
              />
            </div>
            <button
              className="lg:hidden focus:outline-none"
              onClick={toggleSearch}
              aria-label="Toggle search"
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-foreground" />
            </button>

            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-medium text-sm">
              AN
            </div>
            <button
              className="lg:hidden focus:outline-none ml-2"
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
        </div>
      </nav>

      {isSearchOpen && (
        <div className="lg:hidden bg-white w-full px-4 py-2 border-b border-gray-200 z-40">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search brand, category, tag..."
              className="w-full pl-10 pr-4 py-1.5 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-gray-700 text-sm"
              autoFocus
            />
          </div>
        </div>
      )}
      {isOpen && (
        <div className="lg:hidden bg-white w-64 h-screen absolute top-[4rem] right-0 shadow-lg">
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
    </div>
  );
}
