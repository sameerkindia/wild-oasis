'use client'

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import SignOutButton from './SignOutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    name: 'Home',
    href: '/admin',
    icon: <HomeIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Cabins',
    href: '/admin/cabins',
    icon: <CalendarDaysIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Setting',
    href: '/admin/setting',
    icon: <UserIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Create Cabin',
    href: '/admin/create-cabin',
    icon: <UserIcon className='h-5 w-5 text-primary-600' />,
  },
];

function AdminNavigation() {

  const pathname = usePathname()

  return (
    <nav className='border-r border-primary-900'>
      <ul className='flex flex-col gap-2 h-full text-lg'>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${pathname === link.href ? 'bg-primary-900':''} `}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className='mt-auto'>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavigation;
