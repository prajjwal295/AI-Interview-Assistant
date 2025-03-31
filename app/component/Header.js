"use client";

import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

const Header = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  return (
    <header className="relative p-1 bg-black shadow-lg border-b border-neon-blue">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/l1.png"
            width={200}
            height={30}
            alt="logo"
            className="transition-transform duration-300 hover:scale-110"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-lg">
          {["dashboard", "history", "upgrade", "hiw"].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={`relative text-gray-300 hover:text-neon-blue transition-all duration-300 font-medium tracking-wide uppercase ${
                path === `/${item}` ? "text-neon-blue font-bold" : ""
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-neon-blue transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* User Button */}
        <UserButton />

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-4 rounded-md border border-neon-blue hover:bg-neon-blue/20 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={24} className="text-neon-blue" />
          ) : (
            <Menu size={24} className="text-neon-blue" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden mt-4 bg-black p-4 rounded-lg shadow-lg border border-neon-blue animate-fadeIn">
          <ul className="flex flex-col gap-4">
            {["dashboard", "history", "upgrade", "hiw"].map((item) => (
              <li
                key={item}
                className="border-b border-gray-700 pb-2 last:border-none"
              >
                <Link
                  href={`/${item}`}
                  className={`block w-full text-center text-gray-300 hover:text-neon-blue transition-all duration-300 font-semibold ${
                    path === `/${item}` ? "text-neon-blue font-bold" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
