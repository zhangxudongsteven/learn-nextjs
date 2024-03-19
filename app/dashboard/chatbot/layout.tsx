import React from "react";
import BotNav from "@/app/ui/chatbot/BotNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-visible">
      <div className="sticky top-0 z-10 w-full">
        <BotNav/>
      </div>
      <div className="flex-grow overflow-y-auto pt-6">{children}</div>
    </div>
  );
}
