'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {links} from "@/app/ui/dashboard/nav-link-config";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-amber-100 hover:text-amber-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-amber-100 text-amber-600': pathname === link.href,
                },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
