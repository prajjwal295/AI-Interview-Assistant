"use client";

import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Header = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["home", "dashboard", "history", "contest"];

  return (
    <header className="bg-[#0f172a] border-b border-neon-blue h-[8vh] w-full shadow-md z-50">
      <div className="container mx-auto px-4 md:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/l1.png"
            width={160}
            height={30}
            alt="logo"
            className="transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm lg:text-base items-center">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={`relative px-1 text-gray-300 hover:text-neon-blue transition duration-300 tracking-wide uppercase ${
                path === `/${item}` ? "text-neon-blue font-bold" : ""
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </nav>

        {/* User Button */}
        <div className="hidden md:flex">
          <UserButton />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 border border-neon-blue rounded-md transition hover:bg-neon-blue/20"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={22} className="text-neon-blue" />
          ) : (
            <Menu size={22} className="text-neon-blue" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden w-full bg-[#0f172a] border-t border-neon-blue py-4">
          <ul className="flex flex-col gap-3 px-6">
            {navItems.map((item) => {
              const href = item === "home" ? "/" : `/${item}`;
              const isActive = path === href;

              return (
                <li key={item}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`block w-full text-center font-medium uppercase transition 
          ${
            isActive
              ? "text-neon-blue font-bold underline"
              : "text-gray-300 hover:text-neon-blue"
          }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              );
            })}

            <li className="pt-2 flex justify-center">
              <UserButton />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
