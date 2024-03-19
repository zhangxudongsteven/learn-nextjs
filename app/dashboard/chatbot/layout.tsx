'use client';
import React from "react";
import SubpageHeaderNav from "@/app/ui/common/SubpageHeaderNav";
import { CHATBOTS } from "@/app/lib/pages";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-visible">
      <div className="sticky top-0 z-10 w-full">
        <SubpageHeaderNav tabs={CHATBOTS} title="AI 对话"/>
      </div>
      <div className="flex-grow overflow-y-auto pt-6">{children}</div>
    </div>
  );
}
