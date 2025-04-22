"use client";

import Link from "next/link";
import Image from "next/image";
import socialIcons from "../../../../public/socialIcons.png"
const About = [
  { name: "ABOUT", href: "" },
  { name: "About us", href: "/aboutus" },
  { name: "Contact us", href: "/contactus" },
];
const Resourses = [
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
      <footer className="">
        <div className="flex gap-x-7 border-b border-b-[var(--color-primary)]">
          <ul>
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

          <ul>
            {Resourses.map((item) => (
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
          <ul>
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
        <div className="flex justify-around items-baseline">
<button className="p-2.5">
    <p>English (100%)</p>
</button>
<ul className="flex gap-x-2.5">
    <li>Trust & safety</li>
    <li>Terms of use</li>
    <li>Privacy Policy</li>
</ul>
<Image src={socialIcons} alt="social" width={120} height={8}/>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
