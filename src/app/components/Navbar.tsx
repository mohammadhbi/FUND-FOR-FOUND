// import Link from "next/link";
// const navItems = [
//     { name: "Home", href: "/" },
//     { name: "Explore", href: "/explore" },
//     { name: "About Us", href: "/about" },
//     { name: "Help & Support", href: "/help" },
//   ]; 
//   function Navbar() {
    
//     return (
//       <div>
//       <nav className="flex w-full items-center justify-center sticky top-0  bg-background/70 backdrop-blur-lg h-[4rem]">
//         <ul className="flex gap-5 items-center justify-center text-sm text-gray-3 w-[26.6%] max-w-[384px] min-w-[200px] h-[33px]">
//           {navItems.map((item) => (
//             <li key={item.href} className="text-medium whitespace-nowrap">
//               <Link
//                 href={item.href}
//                 className="text-foreground hover:opacity-80 transition-opacity"
//               >
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>  
//       </div>
//     )
//   }
  
//   export default Navbar

// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// const navItems = [
//   { name: "Home", href: "/" },
//   { name: "Explore", href: "/explore" },
//   { name: "About Us", href: "/about" },
//   { name: "Help & Support", href: "/help" },
// ];

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="flex w-full items-center justify-center sticky top-0 bg-background/70 backdrop-blur-lg h-[4rem] px-4 z-50">
//       {/* Desktop Menu */}
//       <ul className="hidden md:flex gap-5 items-center text-sm text-gray-3">
//         {navItems.map((item) => (
//           <li key={item.href} className="whitespace-nowrap">
//             <Link
//               href={item.href}
//               className="text-foreground hover:opacity-80 transition-opacity"
//             >
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       {/* Mobile Hamburger */}
//       <button
//         className="md:hidden text-foreground"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         {menuOpen ? (
//           <XMarkIcon className="w-6 h-6" />
//         ) : (
//           <Bars3Icon className="w-6 h-6" />
//         )}
//       </button>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute top-16 left-0 w-full bg-background/90 backdrop-blur-lg p-4 flex flex-col gap-4 items-center z-50">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               onClick={() => setMenuOpen(false)} // بستن منو بعد از کلیک
//               className="text-foreground text-base hover:opacity-80 transition-opacity"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
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
        {/* لینک‌ها برای دسکتاپ */}
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

        {/* آیکون همبرگری برای موبایل */}
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

      {/* منوی موبایل */}
      {isOpen && (
        <div className="md:hidden bg-white w-64 h-screen absolute top-[4rem] right-0 shadow-lg">
          <ul className="flex flex-col items-start gap-4   justify-center text-sm text-gray-3">
            {navItems.map((item) => (
              <li key={item.href} className="text-medium  whitespace-nowrap  gap-x-3">
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