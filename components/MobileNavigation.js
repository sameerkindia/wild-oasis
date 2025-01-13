"use client";

// import { auth } from "@/lib/auth";
import Link from "next/link";
import { useState } from "react";
import SignOutButton from "./SignOutButton";

export default function MobileNavigation({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen(() => !isOpen);
  }

  return (
    <nav
      className="text-xl overflow-hidden z-[100] 2md:hidden"
      onClick={handleToggle}
    >
      <button onClick={handleToggle} className="cursor-pointer">
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div className={`w-full fixed top-0 right-0 transition-all bg-stone-800 h-screen p-8 pt-12 ${
          isOpen ? "translate-x-[0%]" : "translate-x-[100%]"
        }`} onClick={handleToggle}>
      <ul
        className={`w-3/5 sm:w-2/5 flex flex-col gap-6 2md:gap-12 lg:gap-16 fixed top-0 right-0 transition-all bg-neutral-600 h-screen p-8 pt-16 ${
          isOpen ? "translate-x-[0%]" : "translate-x-[100%]"
        } `}
      >
        <button onClick={handleToggle} className="cursor-pointer absolute top-4 left-4">
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        {session?.user?.admin && (
          <li>
            <Link
              href="/admin"
              className="hover:text-accent-400 transition-colors"
            >
              Admin
            </Link>
          </li>
        )}
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <span>Guest area</span>
              <img
                className="h-8 rounded-full max-sm:hidden"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
        <li className='mt-auto'>
          <SignOutButton iconClass={"w-8 h-8 text-[#d4dee7]"} />
        </li>
      </ul>
      </div>
    </nav>
  );
}
