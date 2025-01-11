'use client'

// import { auth } from "@/lib/auth";
import Link from "next/link";
import {  useState } from "react";

export default function MobileNavigation({session}) {
  const [isOpen , setIsOpen] = useState(false)

  // const session = await auth()


  function handleToggle(){
    console.log(isOpen , "toggle")
    setIsOpen(() => !isOpen )
  }

  return (
    <nav className="text-xl overflow-hidden pt-8 z-[100]" onClick={handleToggle}>
      <button onClick={handleToggle} className="cursor-pointer" >Open</button>

      {/* ${isOpen ? "translate-x-[0%]" : "translate-x-[100%]" }` */}

      <ul className={`flex flex-col gap-6 2md:gap-12 lg:gap-16 items-center fixed top-0 right-0 transition-all bg-neutral-600 h-screen p-8 pt-12 ${isOpen ? "translate-x-[0%]" : "translate-x-[100%]"} `}>
      <button onClick={handleToggle} className="cursor-pointer" >Close</button>
        {session?.user?.admin && <li>
          <Link href="/admin" className="hover:text-accent-400 transition-colors">
            Admin
          </Link>
        </li>}
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          { session?.user?.image ? (<Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex items-center gap-4"
          >
            <img className="h-8 rounded-full" src={session.user.image} alt={session.user.name} referrerPolicy="no-referrer" />
            <span>
            Guest area
            </span>
          </Link>) :
          (<Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guest area
          </Link>)}
        </li>
      </ul>
    </nav>
  );
}
