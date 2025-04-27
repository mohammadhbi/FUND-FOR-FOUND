"use client";

import Link from "next/link";
import Image from "next/image";
import socialIcons from "../../../../public/socialIcons.png";

const About = [
  { name: "ABOUT", href: "" },
  { name: "About us", href: "/aboutus" },
  { name: "Contact us", href: "/contactus" },
];
const Resources = [
  { name: "RESOURSES", href: "" },
  { name: "Blog", href: "/Blog" },
  { name: "How 3F works?", href: "/3Fwork" },
  { name: "Help & support", href: "/helpsupport" },
];
const Contributing = [
  { name: "CONTRIBUTING", href: "" },
  { name: "Brand & Organizations", href: "/brand" },
  { name: "Pricing", href: "/pricing" },
];

function Footer() {
  return (
    <div>
      <footer className="bg-[var(--color-light-3)] mt-20 p-5 rounded-t-2xl">
        {/* دسکتاپ */}
        <div className="hidden sm:flex justify-start gap-x-32 border-b border-b-[var(--color-primary)] md:pr-[33.33%] sm:justify-center">
          <ul className="flex flex-col gap-x-4 gap-y-2.5">
            {About.map((item) => (
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

          <ul className="flex flex-col gap-x-4 gap-y-2.5">
            {Resources.map((item) => (
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

          <ul className="flex flex-col gap-x-4 gap-y-2.5">
            {Contributing.map((item) => (
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
        </div>

        {/* موبایل و تبلت */}
        <div className="sm:hidden flex flex-col border-b border-b-[var(--color-primary)] pb-4 gap-y-5">
          <div className="flex flex-wrap gap-x-0.5 gap-y-4 justify-center">
            {[About, Resources, Contributing].map((section, index) => (
              <ul
                key={index}
                className="flex flex-col gap-2.5 text-center w-[110px]"
              >
                {section.map((item) => (
                  <li key={item.href} className="text-medium text-[10px]">
                    <Link
                      href={item.href}
                      className="text-foreground hover:opacity-80 transition-opacity"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button className="p-2.5 text-[10px]">
              <p>English (100%)</p>
            </button>
            <Image src={socialIcons} alt="social" width={120} height={8} />
          </div>
        </div>

        <div className="md:flex md:items-center md:justify-between sm:flex sm:items-center sm:gap-y-4 hidden">
          <button className="p-2.5">
            <p>English (100%)</p>
          </button>
          <ul className="flex gap-x-2.5 sm:justify-center sm:order-2">
            <li>Trust & safety</li>
            <li>Terms of use</li>
            <li>Privacy Policy</li>
          </ul>
          <Image
            src={socialIcons}
            alt="social"
            width={120}
            height={8}
            className="sm:order-1 sm:pb-4 md:pb-0"
          />
        </div>
      </footer>
    </div>
  );
}

export default Footer;
