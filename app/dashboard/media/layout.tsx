import React from "react";
import MediaNav from "@/app/ui/media/MediaNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-visible">
      <div className="sticky top-0 z-10 w-full">
        <MediaNav/>
      </div>
      <div className="flex-grow overflow-y-auto pt-6">{children}</div>
    </div>
  );
}
