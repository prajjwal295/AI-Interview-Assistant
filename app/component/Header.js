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
    <header className="p-4 bg-secondary shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.svg" width={80} height={20} alt="logo" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          {["dashboard", "questions", "upgrade", "hiw"].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={`hover:text-primary hover:font-bold transition-all ${
                path === `/${item}` ? "text-primary font-bold" : ""
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}{" "}
              {/* Capitalize text */}
            </Link>
          ))}
        </nav>

        {/* User Button */}
        <UserButton />

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden mt-4 bg-secondary p-4 rounded-lg">
          <ul className="flex flex-col gap-3">
            {["dashboard", "questions", "upgrade", "hiw"].map((item) => (
              <li key={item} className="border-b border-gray-700 pb-2">
                <Link
                  href={`/${item}`}
                  className={`block w-full text-center ${
                    path === `/${item}` ? "text-primary font-bold" : ""
                  }`}
                  onClick={() => setIsOpen(false)} // Close menu on click
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
