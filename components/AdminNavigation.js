"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    name: "Home",
    href: "/admin",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Cabins",
    href: "/admin/cabins",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Setting",
    href: "/admin/setting",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Create Cabin",
    href: "/admin/create-cabin",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function AdminNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  function handleToggle() {
    setIsOpen(() => !isOpen);
  }

  return (
    <>
      
      <button className="absolute -top-8 cursor-pointer 2md:hidden" onClick={handleToggle}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          )}
      </button>
      <nav
        className={`max-2md:absolute 2md:hidden z-10 h-full w-full ${
          isOpen ? "translate-x-[0%]" : "translate-x-[-120%]"
        }`} onClick={handleToggle}
      >
        <ul
          className={`flex flex-col gap-2 h-min w-max text-sm ms:text-base sm:text-lg transition-all py-8 px-4 ${
            isOpen ? "translate-x-[0%]" : "translate-x-[-120%]"
          } bg-neutral-600`}
        >
          {navLinks.map((link) => (
            <li key={link.name} onClick={handleToggle}>
              <Link
                className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                  pathname === link.href ? "bg-primary-900" : ""
                } `}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}

          <li className="mt-auto">
            <SignOutButton />
          </li>
        </ul>
      </nav>

      <nav
        className={`border-r border-primary-900 max-2md:absolute max-2md:hidden`}
      >
        <ul className="flex flex-col gap-2 h-full text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                  pathname === link.href ? "bg-primary-900" : ""
                } `}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}

          <li className="mt-auto">
            <SignOutButton />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default AdminNavigation;
