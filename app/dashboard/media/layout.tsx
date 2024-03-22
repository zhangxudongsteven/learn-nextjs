import React from "react";
import SubpageHeaderNav from "@/app/ui/common/SubpageHeaderNav";
import { MEDIAS } from "@/app/lib/pages";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="sticky top-0 z-20 w-full">
        <SubpageHeaderNav tabs={MEDIAS} title="音视频生成"/>
      </div>
      <div className="flex-grow overflow-y-auto pt-6">{children}</div>
    </div>
  );
}
