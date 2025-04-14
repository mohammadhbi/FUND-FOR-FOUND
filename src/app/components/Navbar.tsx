import Link from "next/link";
const navItems = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "About Us", href: "/about" },
    { name: "Help & Support", href: "/help" },
  ]; 
  function Navbar() {
    
    return (
      <div>
      <nav className="flex w-full items-center justify-center sticky top-0  bg-background/70 backdrop-blur-lg h-[4rem]">
        <ul className="flex gap-5 items-center justify-center text-sm text-gray-3 w-[26.6%] max-w-[384px] min-w-[200px] h-[33px]">
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
      </nav>  
      </div>
    )
  }
  
  export default Navbar
  