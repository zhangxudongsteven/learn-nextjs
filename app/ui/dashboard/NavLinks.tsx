"use client"
import {
  HomeIcon,
  DocumentDuplicateIcon,
  ChatBubbleLeftRightIcon, PlayCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  // Choose Icon from https://heroicons.com/
  { name: 'AI 对话', href: '/dashboard/chatbot', icon: ChatBubbleLeftRightIcon },
  { name: '音视频生成', href: '/dashboard/media', icon: PlayCircleIcon },
  { name: 'Demo - Dashboard', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Demo - Table',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
];

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
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-cyan-50 hover:text-cyan-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-cyan-100 text-cyan-600': (pathname.startsWith(link.href) && link.href !== '/dashboard') || (pathname === link.href && link.href === '/dashboard')
              },
            )}
          >
            <LinkIcon className="w-6"/>
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
