"use client"
import React from 'react';
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { notoSansSC } from "@/app/ui/fonts";

// Tab data which could be sourced from a database or API in a real application.
const tabs = [
  { name: '个人助理', href: '/dashboard/chatbot' },
  { name: 'AI说明书', href: '/dashboard/chatbot/manual' },
  { name: '经济学助教', href: '/dashboard/chatbot/economy' },
];

export default function BotNav() {
  const pathname = usePathname();
  return (
    <div className="border-b border-gray-200">
      <div className="sm:flex sm:items-baseline">
        <h1 className={`${notoSansSC.className} text-2xl`}>AI 对话</h1>
        <div className="mt-4 sm:ml-10 sm:mt-0">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={clsx(
                  'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
                  {
                    'border-indigo-500 text-indigo-600': pathname === tab.href,
                    'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': pathname !== tab.href,
                  }
                )}
                aria-current={pathname === tab.href ? 'page' : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
